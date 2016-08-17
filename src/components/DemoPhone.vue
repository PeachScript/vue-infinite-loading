<template>
  <div class="demo-wrapper" v-show="demoType">
    <div class="demo-inner" v-el:scroll-container>
      <div v-if="demoType === 'basic'">
        <p class="basic-list-item" v-for="item in list" v-text="item"></p>
        <infinite-loading :on-infinite="onInfinite"></infinite-loading>
      </div>
      <div class="hacker-news-list" v-if="demoType === 'hackerNews'">
        <div class="hacker-news-header">
          <a target="_blank" href="http://www.ycombinator.com/"><img src="https://news.ycombinator.com/y18.gif"></a>
          <span>Hacker News</span>
        </div>
        <div class="hacker-news-item" v-for="item in list">
          <span class="num" v-text="$index + 1"></span>
          <p><a target="_blank" :href="item.url" v-text="item.title"></a></p>
          <p><small>{{ item.points }} points by <a target="_blank" :href="'https://news.ycombinator.com/user?id=' + item.author" v-text="item.author"></a> | <a target="_blank" :href="'https://news.ycombinator.com/item?id=' + item.objectID" v-text="item.num_comments + ' comments'"></a></small></p>
        </div>
        <infinite-loading :on-infinite="onInfinite">
          <span slot="no-more">
            There is no more Hacker News :(
          </span>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading';

  const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

  export default {
    data() {
      return {
        list: [],
        demoTypes: {
          '/': 'hackerNews',
          '/installation': 'hackerNews',
          '/getting-started': 'basic',
          '/getting-started/basic': 'basic',
          '/getting-started/hacker-news': 'hackerNews',
        },
        timer: null,
      };
    },
    computed: {
      demoType() {
        return this.demoTypes[this.$route.path];
      },
    },
    ready() {
      this.$watch('demoType', this.initInfiniteLoading);
      this.initInfiniteLoading();

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
        switch (this.demoType) {
          case 'basic':
            this.timer = setTimeout(() => {
              const temp = [];
              for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
                temp.push(i);
              }
              this.list = this.list.concat(temp);
              this.$broadcast('$InfiniteLoading:loaded');
            }, 1000);
            break;
          case 'hackerNews':
            this.$http.get(api, {
              params: {
                page: this.list.length / 20 + 1,
              },
            }).then((res) => {
              if (this.demoType === 'hackerNews') {
                this.list = this.list.concat(res.data.hits);
                this.$broadcast('$InfiniteLoading:loaded');
                if (this.list.length / 20 === 10) {
                  this.$broadcast('$InfiniteLoading:noMore');
                }
              }
            });
            break;
          default:
        }
      },
      initInfiniteLoading() {
        this.$broadcast('$InfiniteLoading:reset');
        this.list = [];
        clearTimeout(this.timer);
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
  .basic-list-item{
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
  .hacker-news-list{
    min-height: 455px;
    background-color: #F6F6EF;
    &:after{
      content: '';
      display: table;
      clear: both;
    }
    .hacker-news-header{
      padding: 2px;
      font-family: Verdana, Geneva, sans-serif;
      font-size: 14px;
      line-height: 14px;
      font-weight: bold;
      background-color: #FF6600;
      img{
        border: 1px solid #fff;
        vertical-align: middle;
      }
      span{
        vertical-align: middle;
      }
    }
    .hacker-news-item{
      @gap: 32px;
      margin: 10px 0;
      padding: 0 10px 0 @gap;
      line-height: 16px;
      font-size: 14px;
      .num{
        margin-top: 1px;
        margin-left: -@gap;
        float: left;
        width: @gap;
        color: #888;
        text-align: right;
        &:after{
          content: '.';
        }
      }
      p{
        padding-left: 8px;
        margin: 0;
        a{
          text-decoration: none;
        }
        > a{
          color: #333;
          padding-right: 5px;
        }
        small{
          color: #888;
          a{
            color: #888;
            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
</style>
