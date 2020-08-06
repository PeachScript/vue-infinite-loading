<template>
  <div class="infinite-loading-container">
    <div
      class="infinite-status-prompt"
      v-show="isShowSpinner"
      :style="slotStyles.spinner">
      <slot name="spinner" v-bind="{ isFirstLoad }">
        <spinner :spinner="spinner" />
      </slot>
    </div>
    <div
      class="infinite-status-prompt"
      :style="slotStyles.noResults"
      v-show="isShowNoResults">
      <slot name="no-results">
        <component v-if="slots.noResults.render" :is="slots.noResults"></component>
        <template v-else>{{ slots.noResults }}</template>
      </slot>
    </div>
    <div
      class="infinite-status-prompt"
      :style="slotStyles.noMore"
      v-show="isShowNoMore">
      <slot name="no-more">
        <component v-if="slots.noMore.render" :is="slots.noMore"></component>
        <template v-else>{{ slots.noMore }}</template>
      </slot>
    </div>
    <div
      class="infinite-status-prompt"
      :style="slotStyles.error"
      v-show="isShowError">
      <slot name="error" :trigger="attemptLoad">
        <component
          v-if="slots.error.render"
          :is="slots.error"
          :trigger="attemptLoad">
        </component>
        <template v-else>
          {{ slots.error }}
          <br>
          <button
            class="btn-try-infinite"
            @click="attemptLoad"
            v-text="slots.errorBtnText">
          </button>
        </template>
      </slot>
    </div>
  </div>
</template>
<script>
import Spinner from './Spinner.vue';
import config, {
  evt3rdArg, WARNINGS, STATUS, SLOT_STYLES,
} from '../config';
import {
  warn, throttleer, loopTracker, scrollBarStorage, kebabCase, isVisible,
} from '../utils';

export default {
  name: 'InfiniteLoading',
  data() {
    return {
      scrollParent: null,
      scrollHandler: null,
      isFirstLoad: true, // save the current loading whether it is the first loading
      status: STATUS.READY,
      slots: config.slots,
    };
  },
  components: {
    Spinner,
  },
  computed: {
    isShowSpinner() {
      return this.status === STATUS.LOADING;
    },
    isShowError() {
      return this.status === STATUS.ERROR;
    },
    isShowNoResults() {
      return (
        this.status === STATUS.COMPLETE
        && this.isFirstLoad
      );
    },
    isShowNoMore() {
      return (
        this.status === STATUS.COMPLETE
        && !this.isFirstLoad
      );
    },
    slotStyles() {
      const styles = {};

      Object.keys(config.slots).forEach((key) => {
        const name = kebabCase(key);

        if (
          // no slot and the configured default slot is not a Vue component
          (
            !this.$slots[name]
            && !config.slots[key].render
          )
          // has slot and slot is pure text node
          || (
            this.$slots[name]
            && !this.$slots[name][0].tag
          )
        ) {
          // only apply default styles for pure text slot
          styles[key] = SLOT_STYLES;
        }
      });

      return styles;
    },
  },
  props: {
    distance: {
      type: Number,
      default: config.props.distance,
    },
    spinner: String,
    direction: {
      type: String,
      default: 'bottom',
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

    this.scrollHandler = (ev) => {
      if (this.status === STATUS.READY) {
        if (ev && ev.constructor === Event && isVisible(this.$el)) {
          throttleer.throttle(this.attemptLoad);
        } else {
          this.attemptLoad();
        }
      }
    };

    setTimeout(() => {
      this.scrollHandler();
      this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);
    }, 1);

    this.$on('$InfiniteLoading:loaded', (ev) => {
      this.isFirstLoad = false;

      if (this.direction === 'top') {
        // wait for DOM updated
        this.$nextTick(() => {
          scrollBarStorage.restore(this.scrollParent);
        });
      }

      if (this.status === STATUS.LOADING) {
        this.$nextTick(this.attemptLoad.bind(null, true));
      }

      if (!ev || ev.target !== this) {
        warn(WARNINGS.STATE_CHANGER);
      }
    });

    this.$on('$InfiniteLoading:complete', (ev) => {
      this.status = STATUS.COMPLETE;

      // force re-complation computed properties to fix the problem of get slot text delay
      this.$nextTick(() => {
        this.$forceUpdate();
      });

      this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);

      if (!ev || ev.target !== this) {
        warn(WARNINGS.STATE_CHANGER);
      }
    });

    this.$on('$InfiniteLoading:reset', (ev) => {
      this.status = STATUS.READY;
      this.isFirstLoad = true;
      scrollBarStorage.remove(this.scrollParent);
      this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);

      // wait for list to be empty and the empty action may trigger a scroll event
      setTimeout(() => {
        throttleer.reset();
        this.scrollHandler();
      }, 1);

      if (!ev || ev.target !== this) {
        warn(WARNINGS.IDENTIFIER);
      }
    });

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
      error: () => {
        this.status = STATUS.ERROR;
        throttleer.reset();
      },
    };

    if (this.onInfinite) {
      warn(WARNINGS.INFINITE_EVENT);
    }
  },
  /**
   * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
   */
  deactivated() {
    /* istanbul ignore else */
    if (this.status === STATUS.LOADING) {
      this.status = STATUS.READY;
    }
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
      if (
        this.status !== STATUS.COMPLETE
        && isVisible(this.$el)
        && this.getCurrentDistance() <= this.distance
      ) {
        this.status = STATUS.LOADING;

        if (this.direction === 'top') {
          // wait for spinner display
          this.$nextTick(() => {
            scrollBarStorage.save(this.scrollParent);
          });
        }

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
      } else if (this.status === STATUS.LOADING) {
        this.status = STATUS.READY;
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
        result = document.querySelector(this.forceUseInfiniteWrapper);
      }

      if (!result) {
        if (elm.tagName === 'BODY' || !elm.parentNode) {
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
    /* istanbul ignore else */
    if (!this.status !== STATUS.COMPLETE) {
      throttleer.reset();
      scrollBarStorage.remove(this.scrollParent);
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
    margin: 5px 0;
    width: @size;
    height: @size;
    font-size: @size;
    line-height: @size;
    border-radius: 50%;
  }
}

.btn-try-infinite {
  margin-top: 5px;
  padding: 5px 10px;
  color: #999;
  font-size: 14px;
  line-height: 1;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &:not(:active):hover {
    opacity: 0.8;
  }
}
</style>
