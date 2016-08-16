<template>
  <div class="demo-wrapper">
    <div class="demo-inner" v-el:scroll-container>
      <p class="example-list-item" v-for="item in list" v-text="item"></p>
      <infinite-loading :on-infinite="onInfinite"></infinite-loading>
    </div>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    data() {
      return {
        list: [],
      };
    },
    ready() {
      for (let i = 1; i <= 20; i++) {
        this.list.push(i);
      }

      // Disable double scroll for outer element
      this.$els.scrollContainer.addEventListener('mousewheel', (ev) => {
        const elm = ev.currentTarget;
        const scrollTop = elm.scrollTop;
        const scrollHeight = elm.scrollHeight;
        const height = elm.clientHeight;
        const event = ev.originalEvent || ev;

        const delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0);

        if ((delta > 0 && scrollTop <= delta) ||
            (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
          elm.scrollTop = delta > 0 ? 0 : scrollHeight;
          event.preventDefault();
        }
      });
    },
    methods: {
      onInfinite() {
        setTimeout(() => {
          const temp = [];
          for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
            temp.push(i);
          }
          this.list = this.list.concat(temp);
          this.$broadcast('$InfiniteLoading:loaded');
        }, 1000);
      },
    },
    components: {
      InfiniteLoading,
    },
  };
</script>
<style lang="less">
  .demo-wrapper{
    width: 301px;
    height: 636px;
    padding-top: 80px;
    background: url('../assets/images/phone.png') no-repeat;
    background-size: 100%;
    box-sizing: border-box;
  }
  .demo-inner{
    margin-left: 20px;
    width: 261px;
    height: 455px;
    border: 1px solid #ccc;
    overflow: auto;
  }
  .example-list-item{
    margin: 0;
    padding: 0 10px;
    font-size: 14px;
    line-height: 40px;
    color: #666;
    background-color: #fafafa;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #e3e3e3;
    &:before{
      content: 'Line: ';
    }
  }
</style>
