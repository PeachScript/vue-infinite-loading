<template>
  <div class="infinite-loading-container">
    <div v-show="isLoading">
      <slot name="spinner">
        <spinner :spinner="spinner" />
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="isNoResults">
      <slot name="no-results">{{ slots.noResults }}</slot>
    </div>
    <div class="infinite-status-prompt" v-show="isNoMore">
      <slot name="no-more">{{ slots.noMore }}</slot>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import Spinner from './Spinner.vue';
import config, { evt3rdArg, WARNINGS } from '../config';
import { throttleer, loopTracker, isBlankSlotElm } from '../utils';

export default {
  name: 'InfiniteLoading',
  data() {
    return {
      scrollParent: null,
      scrollHandler: null,
      isLoading: false,
      isComplete: false,
      isFirstLoad: true, // save the current loading whether it is the first loading
      slots: config.slots,
    };
  },
  components: {
    Spinner,
  },
  computed: {
    isNoResults: {
      cache: false, // disable cache to fix the problem of get slot text delay
      get() {
        return (
          !this.isLoading
          && this.isComplete
          && this.isFirstLoad
          && !isBlankSlotElm(this.$slots['no-results'])
        );
      },
    },
    isNoMore: {
      cache: false, // disable cache to fix the problem of get slot text delay
      get() {
        return (
          !this.isLoading
          && this.isComplete
          && !this.isFirstLoad
          && !isBlankSlotElm(this.$slots['no-more'])
        );
      },
    },
  },
  props: {
    distance: {
      type: Number,
      default: config.props.distance,
    },
    spinner: {
      type: String,
      default: config.props.spinner,
    },
    direction: {
      type: String,
      default: config.props.direction,
    },
    forceUseInfiniteWrapper: {
      type: [Boolean, String],
      default: config.props.forceUseInfiniteWrapper,
    },
    identifier: {
      default: +new Date(),
    },
    onInfinite: Function,
  },
  watch: {
    identifier() {
      this.stateChanger.reset();
    },
  },
  mounted() {
    this.$watch('forceUseInfiniteWrapper', () => {
      this.scrollParent = this.getScrollParent();
    }, { immediate: true });

    this.scrollHandler = function scrollHandlerOriginal(ev) {
      if (!this.isLoading) {
        if (ev && ev.constructor === Event) {
          throttleer.throttle(this.attemptLoad);
        } else {
          this.attemptLoad();
        }
      }
    }.bind(this);

    setTimeout(this.scrollHandler, 1);
    this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);

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

      this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);

      if (!ev || ev.target !== this) {
        console.warn(WARNINGS.STATE_CHANGER);
      }
    });

    this.$on('$InfiniteLoading:reset', (ev) => {
      this.isLoading = false;
      this.isComplete = false;
      this.isFirstLoad = true;
      throttleer.reset();
      this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);
      setTimeout(this.scrollHandler, 1);

      if (!ev || ev.target !== this) {
        console.warn(WARNINGS.IDENTIFIER);
      }
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
  },
  /**
   * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
   */
  deactivated() {
    this.isLoading = false;
    this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);
  },
  activated() {
    this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);
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

      if (
        !this.isComplete
        && currentDistance <= this.distance
        && (this.$el.offsetWidth + this.$el.offsetHeight) > 0
      ) {
        this.isLoading = true;

        if (typeof this.onInfinite === 'function') {
          this.onInfinite.call(null, this.stateChanger);
        } else {
          this.$emit('infinite', this.stateChanger);
        }

        if (isContinuousCall && !this.forceUseInfiniteWrapper && !loopTracker.isChecked) {
          // check this component whether be in an infinite loop if it is not checked
          // more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169
          loopTracker.track();
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
        distance = typeof this.scrollParent.scrollTop === 'number'
          ? this.scrollParent.scrollTop
          : this.scrollParent.pageYOffset;
      } else {
        const infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect().top;
        const scrollElmOffsetTopFromBottom = this.scrollParent === window
          ? window.innerHeight
          : this.scrollParent.getBoundingClientRect().bottom;

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

      if (typeof this.forceUseInfiniteWrapper === 'string') {
        result = elm.querySelector(this.forceUseInfiniteWrapper);
      }

      if (!result) {
        if (elm.tagName === 'BODY') {
          result = window;
        } else if (!this.forceUseInfiniteWrapper && ['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
          result = elm;
        } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
          result = elm;
        }
      }

      return result || this.getScrollParent(elm.parentNode);
    },
  },
  destroyed() {
    if (!this.isComplete) {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);
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
