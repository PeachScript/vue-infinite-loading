<template>
  <div class="infinite-loading-container">
    <div v-show="isLoading">
      <slot name="spinner">
        <i :class="spinnerType"></i>
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && isFirstLoad">
      <slot name="no-results">No results :(</slot>
    </div>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && !isFirstLoad">
      <slot name="no-more">No more data :)</slot>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce';

  const spinnerMapping = {
    bubbles: 'loading-bubbles',
    circles: 'loading-circles',
    default: 'loading-default',
    spiral: 'loading-spiral',
    waveDots: 'loading-wave-dots',
  };

  /**
   * get the first scroll parent of an element
   * @param  {DOM} elm - the element which find scorll parent
   * @return {DOM} the first scroll parent
   */
  function getScrollParent(elm) {
    if (elm.tagName === 'BODY') {
      return window;
    } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
      return elm;
    } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
      return elm;
    }
    return getScrollParent(elm.parentNode);
  }


  export default {
    data() {
      return {
        scrollParent: null,
        isLoading: false,
        isComplete: false,
        isFirstLoad: true, // save the current loading whether it is the first loading
      };
    },

    computed: {
      spinnerType() {
        return spinnerMapping[this.spinner] || spinnerMapping.default;
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
      this.scrollParent = getScrollParent(this.$el);

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
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      });
      this.$on('$InfiniteLoading:reset', () => {
        this.isLoading = false;
        this.isComplete = false;
        this.isFirstLoad = true;
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
        setTimeout(this.scrollHandler, 1);
      });
    },

    methods: {
      attemptLoad() {
        const currentDistance = this.getCurrentDistance(this.scrollParent, this.direction);
        if (!this.isComplete && currentDistance <= this.distance) {
          this.isLoading = true;
          this.onInfinite.call();
        } else {
          this.isLoading = false;
        }
      },

      getCurrentDistance(elm, dir) {
        let distance;

        if (dir === 'top') {
          distance = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop;
        } else {
          let scrollElmHeight;
          let elOffsetTop = this.$el.getBoundingClientRect().top;

          if (elm === window) {
            scrollElmHeight = window.innerHeight;
          } else {
            scrollElmHeight = elm.clientHeight;
            elOffsetTop -= elm.getBoundingClientRect().top;
          }
          distance = elOffsetTop - scrollElmHeight;
        }

        return distance;
      },

      scrollHandler: debounce(function _scrollHandler() {
        if (!this.isLoading) {
          this.attemptLoad();
        }
      }, 50),
    },

    /**
     * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: http://vuejs.org/v2/api/#keep-alive
     */
    deactivated() {
      this.isLoading = false;
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
