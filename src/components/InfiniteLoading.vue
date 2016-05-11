<template>
  <div class="infinite-loading-container">
    <i class="icon-loading" v-show="isLoading"></i>
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
      '$InfiniteLoading:loaded'() {
        this.isLoading = false;
      },
    },
    destroyed() {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    },
  };
</script>
<style lang="less" scoped>
  @font-face {font-family: "vue-infinite-loading";
    src: url('../assets/vue-infinite-loading.eot?t=1462930749'); /* IE9*/
    src: url('../assets/vue-infinite-loading.woff?t=1462930749') format('woff'), /* chrome, firefox */
         url('../assets/vue-infinite-loading.ttf?t=1462930749') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
         url('../assets/vue-infinite-loading.svg?t=1462930749#vue-infinite-loading') format('svg'); /* iOS 4.1- */
  }
  .icon-loading:before {
    content: "\e600";
    font-family:"vue-infinite-loading" !important;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .infinite-loading-container{
    clear: both;
    text-align: center;
    *[class^=icon-]{
      @size: 30px;
      display: inline-block;
      margin: 15px 0;
      width: @size;
      height: @size;
      font-size: @size;
      line-height: @size;
      color: #999;
      border-radius: 50%;
      animation: ease loading 1.5s infinite;
    }
  }

  @keyframes loading {
    0%{
      transform: rotate(-38deg);
    }
    100%{
      transform: rotate(322deg);
    }
  }
</style>
