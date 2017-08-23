<template>
  <div class="infinite-loading-container">
    <div v-show="isLoading">
      <slot name="spinner">
        <i :class="spinnerType"></i>
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

  const spinnerMapping = {
    bubbles: 'loading-bubbles',
    circles: 'loading-circles',
    default: 'loading-default',
    spiral: 'loading-spiral',
    waveDots: 'loading-wave-dots',
  };

  export default {
    data() {
      return {
        scrollParent: null,
        scrollHandler: null,
        isLoading: false,
        isComplete: false,
        isFirstLoad: true, // save the current loading whether it is the first loading
        debounceTimer: null,
        debounceDuration: 100,
      };
    },
    computed: {
      spinnerType() {
        return spinnerMapping[this.spinner] || spinnerMapping.default;
      },
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

      this.$on('$InfiniteLoading:loaded', () => {
        this.isFirstLoad = false;
        if (this.isLoading) {
          this.$nextTick(this.attemptLoad);
        }
      });

      this.$on('$InfiniteLoading:complete', () => {
        this.isLoading = false;
        this.isComplete = true;

        // force re-complation computed properties to fix the problem of get slot text delay
        this.$nextTick(() => {
          this.$forceUpdate();
        });
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      });

      this.$on('$InfiniteLoading:reset', () => {
        this.isLoading = false;
        this.isComplete = false;
        this.isFirstLoad = true;
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
        setTimeout(this.scrollHandler, 1);
      });

      if (this.onInfinite) {
        console.warn('[Vue-infinite-loading warn]: `:on-infinite` property will be deprecated soon, please use `@infinite` event instead.');
      }
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
      */
      attemptLoad() {
        const currentDistance = this.getCurrentDistance();

        if (!this.isComplete && currentDistance <= this.distance) {
          this.isLoading = true;

          if (typeof this.onInfinite === 'function') {
            this.onInfinite.call();
          } else {
            this.$emit('infinite');
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
        } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
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
  @import '../styles/spinner';

  .infinite-loading-container{
    clear: both;
    text-align: center;
    *[class^=loading-]{
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

  .infinite-status-prompt{
    color: #666;
    font-size: 14px;
    text-align: center;
    padding: 10px 0;
  }
</style>
