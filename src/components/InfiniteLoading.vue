<template>
  <div class="infinite-loading-container">
    <i class="icon-loading" v-show="isLoading"></i>
    <div class="infinite-status-tips" v-show="!isLoading && isNoResults">
      <slot name="no-results">No results :(</slot>
    </div>
    <div class="infinite-status-tips" v-show="!isLoading && isNoMore">
      <slot name="no-more">No more data :)</slot>
    </div>
  </div>
</template>
<script>
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
    const innerHeight = elm === window
                      ? window.innerHeight
                      : parseInt(getComputedStyle(elm).height, 10);
    const scrollHeight = elm === window
                       ? document.body.scrollHeight
                       : elm.scrollHeight;
    const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop;

    return scrollHeight - innerHeight - scrollTop;
  }

  export default {
    data() {
      return {
        isLoading: false,
        scrollParent: null,
        scrollHandler: null,
        isNoResults: false,
        isNoMore: false,
      };
    },
    props: {
      distance: Number,
      onInfinite: Function,
    },
    ready() {
      if (this.distance === undefined) {
        this.$set('distance', 100);
      }

      this.scrollParent = getScrollParent(this.$el);

      this.scrollHandler = function scrollHandlerOriginal() {
        const currentDistance = getCurrentDistance(this.scrollParent);
        if (!this.isLoading && currentDistance <= this.distance) {
          this.isLoading = true;
          if (this.onInfinite) {
            this.onInfinite.call();
          }
        }
      }.bind(this);

      setTimeout(this.scrollHandler, 1);
      this.scrollParent.addEventListener('scroll', this.scrollHandler);
    },
    events: {
      // Hide the loading icon when data was loaded
      '$InfiniteLoading:loaded': function loaded() {
        this.isLoading = false;
      },
      '$InfiniteLoading:noResults': function noResults() {
        this.isLoading = false;
        this.isNoMore = false;
        this.isNoResults = true;
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      },
      '$InfiniteLoading:noMore': function noMore() {
        this.isLoading = false;
        this.isNoResults = false;
        this.isNoMore = true;
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      },
      '$InfiniteLoading:reset': function reset() {
        this.isLoading = false;
        this.isNoMore = false;
        this.isNoResults = false;
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
        setTimeout(this.scrollHandler, 1);
      },
    },
    destroyed() {
      if (!this.isNoResults && !this.isNoMore) {
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },
  };
</script>
<style lang="less" scoped>
  .icon-loading{
    position: relative;
    border: 1px solid #999;
    animation: ease icon-rotating 1.5s infinite;
    &:before{
      @size: 6px;
      content: '';
      position: absolute;
      display: block;
      top: 0;
      left: 50%;
      margin-top: -@size/2;
      margin-left: -@size/2;
      width: @size;
      height: @size;
      background-color: #999;
      border-radius: 50%;
    }
  }
  .icon-wave-dots{
    position: relative;
    &:before{
      @size: 8px;
      @wave: -6px;
      @near-wave: -4px;
      @after-wave: 2px;
      @c-wave: #999;
      @c-near-wave: #bbb;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -@size/2;
      margin-top: -@size/2;
      width: @size;
      height: @size;
      background-color: @c-near-wave;
      border-radius: 50%;
      animation: linear icon-wave-dots 2.8s infinite;
      @keyframes icon-wave-dots{
        0%{
          box-shadow: -@size * 4 0 0 @c-near-wave,
                      -@size * 2 0 0 @c-near-wave,
                      @size * 2 0 0 @c-near-wave,
                      @size * 4 0 0 @c-near-wave;
        }
        5%{
          box-shadow: -@size * 4 @near-wave 0 @c-near-wave,
                      -@size * 2 0 0 @c-near-wave,
                      @size * 2 0 0 @c-near-wave,
                      @size * 4 0 0 @c-near-wave;
          transform: translateY(0);
        }
        10%{
          box-shadow: -@size * 4 @wave 0 @c-wave,
                      -@size * 2 @near-wave 0 @c-near-wave,
                      @size * 2 0 0 @c-near-wave,
                      @size * 4 0 0 @c-near-wave;
          transform: translateY(0);
        }
        15%{
          box-shadow: -@size * 4 @after-wave 0 @c-near-wave,
                      -@size * 2 @wave - @near-wave 0 @c-wave,
                      @size * 2 -@near-wave 0 @c-near-wave,
                      @size * 4 -@near-wave 0 @c-near-wave;
          transform: translateY(@near-wave);
          background-color: @c-near-wave;
        }
        20%{
          box-shadow: -@size * 4 -@wave 0 @c-near-wave,
                      -@size * 2 @near-wave - @wave + @after-wave 0 @c-near-wave,
                      @size * 2 @near-wave - @wave 0 @c-near-wave,
                      @size * 4 -@wave 0 @c-near-wave;
          transform: translateY(@wave);
          background-color: @c-wave;
        }
        25%{
          @offset: @near-wave + @after-wave;
          box-shadow: -@size * 4 -@offset 0 @c-near-wave,
                      -@size * 2 -@offset 0 @c-near-wave,
                      @size * 2 @wave - @offset 0 @c-wave,
                      @size * 4 @near-wave - @offset 0 @c-near-wave;
          transform: translateY(@offset);
          background-color: @c-near-wave;
        }
        30%{
          box-shadow: -@size * 4 0 0 @c-near-wave,
                      -@size * 2 0 0 @c-near-wave,
                      @size * 2 @near-wave + @after-wave 0 @c-near-wave,
                      @size * 4 @wave 0 @c-wave;
          transform: translateY(0);
        }
        35%{
          box-shadow: -@size * 4 0 0 @c-near-wave,
                      -@size * 2 0 0 @c-near-wave,
                      @size * 2 0 0 @c-near-wave,
                      @size * 4 @near-wave + @after-wave 0 @c-near-wave;
        }
        40%{
          box-shadow: -@size * 4 0 0 @c-near-wave,
                      -@size * 2 0 0 @c-near-wave,
                      @size * 2 0 0 @c-near-wave,
                      @size * 4 0 0 @c-near-wave;
        }
        100%{
          box-shadow: -@size * 4 0 0 @c-near-wave,
                      -@size * 2 0 0 @c-near-wave,
                      @size * 2 0 0 @c-near-wave,
                      @size * 4 0 0 @c-near-wave;
        }
      }
    }
  }

  .icon-spiral{
    border: 2px solid #777;
    border-right-color: transparent;
    animation: linear icon-rotating .85s infinite;
  }

  .infinite-loading-container{
    clear: both;
    text-align: center;
    *[class^=icon-]{
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

  .infinite-status-tips{
    color: #666;
    font-size: 14px;
    text-align: center;
    padding: 10px 0;
  }

  @keyframes icon-rotating{
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
