<template>
  <div class="infinite-loading-container"
      :class="{
        hidden: !isLoading
      }">
    <i class="icon-loading"></i>
  </div>
</template>
<script>
  let scrollParent;
  let scrollHandler;

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

    return scrollHeight - innerHeight - (elm.scrollTop || elm.pageYOffset);
  }

  export default {
    data() {
      return {
        isLoading: false,
      };
    },
    props: {
      distance: Number,
      onInfinite: Function,
    },
    ready() {
      if (this.distance === undefined) {
        this.$set('distance', 50);
      }

      scrollParent = getScrollParent(this.$el);

      scrollHandler = function scrollHandlerOriginal() {
        const currentDistance = getCurrentDistance(scrollParent);
        if (!this.isLoading) {
          if (currentDistance <= this.distance) {
            this.isLoading = true;
            if (this.onInfinite) {
              this.onInfinite.call();
            }
          }
        }
      }.bind(this);

      setTimeout(scrollHandler, 1);
      scrollParent.addEventListener('scroll', scrollHandler);
    },
    events: {
      // Hide the loading icon when data was loaded
      '$InfiniteLoading:loaded'() {
        this.isLoading = false;
      },
    },
    destroyed() {
      scrollParent.removeEventListener('scroll', scrollHandler);
    },
  };
</script>
<style lang="less">
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
    padding: 15px 0;
    min-height: 40px;
    text-align: center;
    *[class^=icon-]{
      @size: 30px;
      display: inline-block;
      width: @size;
      height: @size;
      font-size: @size;
      line-height: @size;
      color: #999;
      animation: ease loading 1.5s infinite;
    }
    &.hidden{
      display: none;
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
