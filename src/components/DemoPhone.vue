<template>
  <div class="demo-wrapper" v-show="demoType">
    <div class="demo-inner" v-el:scroll-container>
      <div v-if="demoType === 'basic'">
        <p class="basic-list-item" v-for="item in list" v-text="item"></p>
        <infinite-loading :on-infinite="onInfinite"></infinite-loading>
      </div>
      <div class="hacker-news-list" v-if="['hackerNews', 'withFilter', 'manualLoad'].indexOf(demoType) > -1">
        <div class="hacker-news-header">
          <a target="_blank" href="http://www.ycombinator.com/"><img src="https://news.ycombinator.com/y18.gif"></a>
          <span>Hacker News</span>
          <select v-if="demoType === 'withFilter'" v-model="tag" @change="initInfiniteLoading()">
            <option value="story">Story</option>
            <option value="poll">Poll</option>
            <option value="show_hn">Show hn</option>
            <option value="ask_hn">Ask hn</option>
            <option value="front_page">Front page</option>
          </select>
        </div>
        <div class="hacker-news-item" v-for="item in list">
          <span class="num" v-text="$index + 1"></span>
          <p><a target="_blank" :href="item.url" v-text="item.title"></a></p>
          <p><small>{{ item.points }} points by <a target="_blank" :href="'https://news.ycombinator.com/user?id=' + item.author" v-text="item.author"></a> | <a target="_blank" :href="'https://news.ycombinator.com/item?id=' + item.objectID" v-text="item.num_comments + ' comments'"></a></small></p>
        </div>
        <button class="btn-load-more" v-show="distance < 0" @click="loadMore">Load more</button>
        <infinite-loading :on-infinite="onInfinite" :distance="distance" v-ref:infinite-loading>
          <span slot="no-more">
            There is no more Hacker News :(
          </span>
        </infinite-loading>
      </div>
      <div v-if="demoType === 'spinners'">
        <infinite-loading :on-infinite="onInfinite" :spinner="spinner"></infinite-loading>
      </div>
    </div>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading';

  const api = `${window.location.protocol}//hn.algolia.com/api/v1/search_by_date`;

  export default {
    data() {
      return {
        list: [],
        demoTypes: {
          '/': 'hackerNews',
          '/installation': 'hackerNews',
          '/basicUse': 'basic',
          '/hackerNews': 'hackerNews',
          '/withFilter': 'withFilter',
          '/spinners': 'spinners',
          '/serverSideRendering': 'hackerNews',
          '/triggerManually': 'manualLoad',
        },
        timer: null,
        tag: 'story',
        spinner: 'default',
        distance: 100,
      };
    },
    computed: {
      demoType() {
        return this.demoTypes[`/${this.$route.name || ''}`];
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
                tags: 'story',
                page: (this.list.length / 20) + 1,
              },
            }).then(res => res.json()).then((data) => {
              if (this.demoType === 'hackerNews') {
                if (data.hits.length) {
                  this.list = this.list.concat(data.hits);
                  this.$broadcast('$InfiniteLoading:loaded');
                  if (this.list.length / 20 === 10) {
                    this.$broadcast('$InfiniteLoading:complete');
                  }
                } else {
                  this.$broadcast('$InfiniteLoading:complete');
                }
              }
            });
            break;
          case 'withFilter':
            this.$http.get(api, {
              params: {
                tags: this.tag,
                page: (this.list.length / 20) + 1,
              },
            }).then(res => res.json()).then((data) => {
              if (this.demoType === 'withFilter') {
                if (data.hits.length) {
                  this.list = this.list.concat(data.hits);
                  this.$broadcast('$InfiniteLoading:loaded');
                  if (this.list.length / 20 === 10) {
                    this.$broadcast('$InfiniteLoading:complete');
                  }
                } else {
                  this.$broadcast('$InfiniteLoading:complete');
                }
              }
            });
            break;
          case 'manualLoad':
            this.$http.get(api, {
              params: {
                tags: 'story',
                page: (this.list.length / 20) + 1,
              },
            }).then(res => res.json()).then((data) => {
              if (this.demoType === 'manualLoad') {
                if (data.hits.length) {
                  this.list = this.list.concat(data.hits);
                  this.$broadcast('$InfiniteLoading:loaded');
                  if (this.list.length / 20 === 10) {
                    this.$broadcast('$InfiniteLoading:complete');
                  } else if (data.page % 3 === 0) {
                    this.distance = -Infinity;
                  }
                } else {
                  this.$broadcast('$InfiniteLoading:complete');
                }
              }
            });
            break;
          default:
        }
      },
      initInfiniteLoading() {
        this.list = [];
        this.spinner = 'default';
        if (this.$route.name === 'triggerManually') {
          this.distance = -Infinity;
        } else {
          this.distance = 100;
        }
        clearTimeout(this.timer);
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        });
      },
      loadMore() {
        this.distance = 100;
        this.$nextTick(() => {
          this.$refs.infiniteLoading.attemptLoad();
        });
      },
    },
    events: {
      '$DemoPhone:changeSpinner': function changeSpinner(spinner) {
        this.spinner = spinner;
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
    overscroll-behavior: contain;
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
      line-height: 14px;
      background-color: #FF6600;
      img{
        border: 1px solid #fff;
        vertical-align: middle;
      }
      span{
        font-family: Verdana, Geneva, sans-serif;
        font-size: 14px;
        font-weight: bold;
        vertical-align: middle;
      }
      select{
        float: right;
        color: #fff;
        background-color: transparent;
        border: 1px solid #fff;
        outline: none;
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
    .btn-load-more {
      display: block;
      width: 100%;
      padding: 8px 0 16px;
      font-size: 14px;
      color: #FF6601;
      cursor: pointer;
      border: 0;
      background: transparent;
      &:active {
        color: #e55d07;
      }
    }
  }
</style>
