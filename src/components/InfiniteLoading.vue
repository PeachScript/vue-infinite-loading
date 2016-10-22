<template>
  <div class="infinite-loading-container">
    <slot name="spinner">
      <i :class="spinnerType" v-show="isLoading && !isTransitioning"></i>
    </slot>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && isFirstLoad">
      <slot name="no-results">No results :(</slot>
    </div>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && !isFirstLoad">
      <slot name="no-more">No more data :)</slot>
    </div>
  </div>
</template>
<script>
  const spinnerMapping = {
    bubbles: 'loading-bubbles',
    circles: 'loading-circles',
    default: 'loading-default',
    spiral: 'loading-spiral',
    waveDots: 'loading-wave-dots',
  };

  /**
   * get the first scroll parent of an element
   * @param  {DOM} elm    the element which find scorll parent
   * @return {DOM}        the first scroll parent
   */
  function getScrollParent(elm) {
    if (elm.tagName === 'BODY') {
      return window;
    } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
      return elm;
    }
    return getScrollParent(elm.parentNode);
  }

  /**
   * get current distance from footer
   * @param  {DOM} elm    scroll element
   * @return {Number}     distance
   */
  function getCurrentDistance(elm) {
    const styles = getComputedStyle(elm === window ? document.body : elm);
    const innerHeight = elm === window
                      ? window.innerHeight
                      : parseInt(styles.height, 10);
    const scrollHeight = elm === window
                       ? document.body.scrollHeight
                       : elm.scrollHeight;
    const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop;
    const paddingTop = parseInt(styles.paddingTop, 10);
    const paddingBottom = parseInt(styles.paddingBottom, 10);

    return scrollHeight - innerHeight - scrollTop - paddingTop - paddingBottom;
  }

  export default {
    data() {
      return {
        scrollParent: null,
        scrollHandler: null,
        isLoading: false,
        isComplete: false,
        isFirstLoad: true, // save the current loading whether it is the first loading
        isTransitioning: false, // save transition status
        loadedCount: 0,
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
      onInfinite: {
        type: Function,
        required: true,
      },
      spinner: String,
      transition: {
        type: Object, // Must be a Vue transition object
      },
      staggerCount: {
        type: Number,
        default: null,
      },
    },
    ready() {
      this.scrollParent = getScrollParent(this.$el);

      this.scrollHandler = function scrollHandlerOriginal() {
        const currentDistance = getCurrentDistance(this.scrollParent);
        if (!this.isLoading && currentDistance <= this.distance) {
          this.isLoading = true;
          this.onInfinite.call();
        }
      }.bind(this);

      setTimeout(this.scrollHandler, 1);
      this.scrollParent.addEventListener('scroll', this.scrollHandler);
    },
    methods: {
      listenTransitionEndOnce(callback, isReset = false) {
        if (this.transition) {
          const type = isReset ? 'afterLeave' : 'afterEnter';
          const originalListener = this.transition[type];
          let staggerIndex = 0;

          this.isTransitioning = true;
          this.transition[type] = () => {
            // has no stagger or complete all stagger
            if (this.staggerCount === null ||
                ++staggerIndex === Math.abs(this.staggerCount - this.loadedCount)) {
              // restore original hook
              if (typeof originalListener === 'function') {
                originalListener.call(this);
                this.transition[type] = originalListener;
              } else {
                delete this.transition[type];
              }
              this.loadedCount = this.staggerCount; // save current count
              this.isTransitioning = false;
              callback.call(this);
            } else if (typeof originalListener === 'function') {
              originalListener.call(this);
            }
          };
        } else {
          callback.call(this);
        }
      },
    },
    events: {
      '$InfiniteLoading:loaded': function loaded() {
        this.listenTransitionEndOnce(() => {
          this.isLoading = false;
          this.isFirstLoad = false;
        });
      },
      '$InfiniteLoading:complete': function complete() {
        this.listenTransitionEndOnce(() => {
          this.isLoading = false;
          this.isComplete = true;
          this.scrollParent.removeEventListener('scroll', this.scrollHandler);
        });
      },
      '$InfiniteLoading:reset': function reset() {
        this.listenTransitionEndOnce(() => {
          this.isLoading = false;
          this.isComplete = false;
          this.isFirstLoad = true;
          this.scrollParent.addEventListener('scroll', this.scrollHandler);
          setTimeout(this.scrollHandler, 1);
        }, true);
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
