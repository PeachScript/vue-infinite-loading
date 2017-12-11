<template>
  <div class="infinite-loading-container">
    <div v-show="isLoading">
      <slot name="spinner">
        <spinner :spinner="spinner" />
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="isNoResults">
      <slot name="no-results">No results :(</slot>
    </div>
    <div class="infinite-status-prompt" v-show="isNoMore">
      <slot name="no-more">No more data :)</slot>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-console */
  import Spinner from './Spinner';

  const LOOP_CHECK_TIMEOUT = 1000; // the timeout for check infinite loop
  const LOOP_CHECK_MAX_CALLS = 10; // the maximum number of continuous calls
  const WARNINGS = {
    STATE_CHANGER: [
      '[Vue-infinite-loading warn]: emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):',
      '\ntemplate:',
      '<infinite-loading @infinite="infiniteHandler"></infinite-loading>',
      `
  script:
  ...
  infiniteHandler($state) {
    ajax('https://www.example.com/api/news')
      .then((res) => {
        if (res.data.length) {
          $state.loaded();
        } else {
          $state.complete();
        }
      });
  }
  ...`,
      '',
      'more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549',
    ].join('\n'),
    INFINITE_EVENT: '[Vue-infinite-loading warn]: `:on-infinite` property will be deprecated soon, please use `@infinite` event instead.',
  };
  const ERRORS = {
    INFINITE_LOOP: [
      `[Vue-infinite-loading error]: executed the callback function more than ${LOOP_CHECK_MAX_CALLS} times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:`,
      `
  <!-- add a special attribute for the real scroll wrapper -->
  <div infinite-wrapper>
    ...
    <!-- set force-use-infinite-wrapper to true -->
    <infinite-loading force-use-infinite-wrapper="true"></infinite-loading>
  </div>
      `,
      'more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169',
    ].join('\n'),
  };

  export default {
    name: 'InfiniteLoading',
    data() {
      return {
        scrollParent: null,
        scrollHandler: null,
        isLoading: false,
        isComplete: false,
        isFirstLoad: true, // save the current loading whether it is the first loading
        debounceTimer: null,
        debounceDuration: 50,
        infiniteLoopChecked: false, // save the status of infinite loop check
        infiniteLoopTimer: null,
        continuousCallTimes: 0,
      };
    },
    components: {
      Spinner,
    },
    computed: {
      isNoResults: {
        cache: false, // disable cache to fix the problem of get slot text delay
        get() {
          const noResultsSlot = this.$slots['no-results'];
          const isBlankNoResultsSlot = (noResultsSlot && noResultsSlot[0].elm && noResultsSlot[0].elm.textContent === '');

          return !this.isLoading && this.isComplete && this.isFirstLoad && !isBlankNoResultsSlot;
        },
      },
      isNoMore: {
        cache: false, // disable cache to fix the problem of get slot text delay
        get() {
          const noMoreSlot = this.$slots['no-more'];
          const isBlankNoMoreSlot = (noMoreSlot && noMoreSlot[0].elm && noMoreSlot[0].elm.textContent === '');

          return !this.isLoading && this.isComplete && !this.isFirstLoad && !isBlankNoMoreSlot;
        },
      },
    },
    props: {
      distance: {
        type: Number,
        default: 100,
      },
      onInfinite: Function,
      spinner: String,
      direction: {
        type: String,
        default: 'bottom',
      },
      forceUseInfiniteWrapper: null,
    },
    mounted() {
      this.scrollParent = this.getScrollParent();

      this.scrollHandler = function scrollHandlerOriginal(ev) {
        if (!this.isLoading) {
          clearTimeout(this.debounceTimer);

          if (ev && ev.constructor === Event) {
            this.debounceTimer = setTimeout(this.attemptLoad, this.debounceDuration);
          } else {
            this.attemptLoad();
          }
        }
      }.bind(this);

      setTimeout(this.scrollHandler, 1);
      this.scrollParent.addEventListener('scroll', this.scrollHandler);

      this.$on('$InfiniteLoading:loaded', (ev) => {
        this.isFirstLoad = false;

        if (this.isLoading) {
          this.$nextTick(this.attemptLoad.bind(null, true));
        }

        if (!ev || ev.target !== this) {
          console.warn(WARNINGS.STATE_CHANGER);
        }
      });

      this.$on('$InfiniteLoading:complete', (ev) => {
        this.isLoading = false;
        this.isComplete = true;

        // force re-complation computed properties to fix the problem of get slot text delay
        this.$nextTick(() => {
          this.$forceUpdate();
        });

        this.scrollParent.removeEventListener('scroll', this.scrollHandler);

        if (!ev || ev.target !== this) {
          console.warn(WARNINGS.STATE_CHANGER);
        }
      });

      this.$on('$InfiniteLoading:reset', () => {
        this.isLoading = false;
        this.isComplete = false;
        this.isFirstLoad = true;
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
        setTimeout(this.scrollHandler, 1);
      });

      if (this.onInfinite) {
        console.warn(WARNINGS.INFINITE_EVENT);
      }

      /**
       * change state for this component, pass to the callback
       */
      this.stateChanger = {
        loaded: () => {
          this.$emit('$InfiniteLoading:loaded', { target: this });
        },
        complete: () => {
          this.$emit('$InfiniteLoading:complete', { target: this });
        },
        reset: () => {
          this.$emit('$InfiniteLoading:reset', { target: this });
        },
      };

      /**
       * watch for the `force-use-infinite-wrapper` property
       */
      this.$watch('forceUseInfiniteWrapper', () => {
        this.scrollParent = this.getScrollParent();
      });
    },
    /**
     * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
     */
    deactivated() {
      this.isLoading = false;
      this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    },
    activated() {
      this.scrollParent.addEventListener('scroll', this.scrollHandler);
    },
    methods: {
      /**
      * attempt trigger load
      * @param {Boolean} isContinuousCall  the flag of continuous call, it will be true
      *                                    if this method be called in the `loaded`
      *                                    event handler
      */
      attemptLoad(isContinuousCall) {
        const currentDistance = this.getCurrentDistance();

        if (!this.isComplete && currentDistance <= this.distance &&
          (this.$el.offsetWidth + this.$el.offsetHeight) > 0) {
          this.isLoading = true;

          if (typeof this.onInfinite === 'function') {
            this.onInfinite.call(null, this.stateChanger);
          } else {
            this.$emit('infinite', this.stateChanger);
          }

          if (isContinuousCall && !this.forceUseInfiniteWrapper && !this.infiniteLoopChecked) {
            // check this component whether be in an infinite loop if it is not checked
            // more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169
            this.continuousCallTimes += 1; // save the times of calls

            clearTimeout(this.infiniteLoopTimer);
            this.infiniteLoopTimer = setTimeout(() => {
              this.infiniteLoopChecked = true;
            }, LOOP_CHECK_TIMEOUT);

            // throw warning if the times of continuous calls large than the maximum times
            if (this.continuousCallTimes > LOOP_CHECK_MAX_CALLS) {
              console.error(ERRORS.INFINITE_LOOP);
              this.infiniteLoopChecked = true;
            }
          }
        } else {
          this.isLoading = false;
        }
      },
      /**
      * get current distance from the specified direction
      * @return {Number}     distance
      */
      getCurrentDistance() {
        let distance;

        if (this.direction === 'top') {
          distance = isNaN(this.scrollParent.scrollTop) ?
            this.scrollParent.pageYOffset :
            this.scrollParent.scrollTop;
        } else {
          const infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect().top;
          const scrollElmOffsetTopFromBottom = this.scrollParent === window ?
            window.innerHeight :
            this.scrollParent.getBoundingClientRect().bottom;

          distance = infiniteElmOffsetTopFromBottom - scrollElmOffsetTopFromBottom;
        }

        return distance;
      },
      /**
      * get the first scroll parent of an element
      * @param  {DOM} elm    cache element for recursive search
      * @return {DOM}        the first scroll parent
      */
      getScrollParent(elm = this.$el) {
        let result;

        if (elm.tagName === 'BODY') {
          result = window;
        } else if (!this.forceUseInfiniteWrapper && ['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
          result = elm;
        } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
          result = elm;
        }

        return result || this.getScrollParent(elm.parentNode);
      },
    },
    destroyed() {
      if (!this.isComplete) {
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },
  };
</script>
<style lang="less" scoped>
  @deep: ~'>>>';

  .infinite-loading-container {
    clear: both;
    text-align: center;
    @{deep} *[class^=loading-] {
      @size: 28px;
      display: inline-block;
      margin: 15px 0;
      width: @size;
      height: @size;
      font-size: @size;
      line-height: @size;
      border-radius: 50%;
    }
  }

  .infinite-status-prompt {
    color: #666;
    font-size: 14px;
    text-align: center;
    padding: 10px 0;
  }
</style>
