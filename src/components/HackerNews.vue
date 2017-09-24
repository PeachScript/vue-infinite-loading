<template>
  <h3>Hacker News</h3>
  <p>In this case, we will clone a Hacker News but with <code>InfiniteLoading</code> instead of paginations.</p>
  <p>Before create it, we need to prepare the following things:</p>
  <ol>
    <li>Hacker News API, we used <a target="_blank" href="https://hn.algolia.com/api">HN Search API</a> in this case;</li>
    <li v-show="$parent.docVersion < 2">Import the <a target="_blank" href="https://github.com/vuejs/vue-resource">vue-resource</a> plugin to request news data.</li>
    <li v-show="$parent.docVersion >= 2">Import the <a target="_blank" href="https://github.com/mzabriskie/axios">axios</a> library to request news data.</li>
  </ol>
  <h4>Template</h4>
  <pre v-highlightjs v-if="$parent.docVersion < 2">&lt;div class=&quot;hacker-news-list&quot;&gt;
  &lt;div class=&quot;hacker-news-header&quot;&gt;
    &lt;a target=&quot;_blank&quot; href=&quot;http://www.ycombinator.com/&quot;&gt;
      &lt;img src=&quot;https://news.ycombinator.com/y18.gif&quot;&gt;
    &lt;/a&gt;
    &lt;span&gt;Hacker News&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class=&quot;hacker-news-item&quot; v-for=&quot;item in list&quot;&gt;
    &lt;span class=&quot;num&quot; v-text=&quot;$index + 1&quot;&gt;&lt;/span&gt;
    &lt;p&gt;
      &lt;a target=&quot;_blank&quot; :href=&quot;item.url&quot; v-text=&quot;item.title&quot;&gt;&lt;/a&gt;
    &lt;/p&gt;
    &lt;p&gt;
      &lt;small&gt;
        &lt;span v-text=&quot;item.points&quot;&gt;&lt;/span&gt;
        points by
        &lt;a target=&quot;_blank&quot; :href=&quot;'https://news.ycombinator.com/user?id=' + item.author&quot;
           v-text=&quot;item.author&quot;&gt;&lt;/a&gt;
        |
        &lt;a target=&quot;_blank&quot; :href=&quot;'https://news.ycombinator.com/item?id=' + item.objectID&quot;
           v-text=&quot;item.num_comments + ' comments'&quot;&gt;&lt;/a&gt;
      &lt;/small&gt;
    &lt;/p&gt;
  &lt;/div&gt;
  &lt;infinite-loading :on-infinite=&quot;onInfinite&quot;&gt;
    &lt;span slot=&quot;no-more&quot;&gt;
      There is no more Hacker News :(
    &lt;/span&gt;
  &lt;/infinite-loading&gt;
&lt;/div&gt;</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2 && $parent.docVersion < 2.2">&lt;div class=&quot;hacker-news-list&quot;&gt;
  &lt;div class=&quot;hacker-news-header&quot;&gt;
    &lt;a target=&quot;_blank&quot; href=&quot;http://www.ycombinator.com/&quot;&gt;
      &lt;img src=&quot;https://news.ycombinator.com/y18.gif&quot;&gt;
    &lt;/a&gt;
    &lt;span&gt;Hacker News&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class=&quot;hacker-news-item&quot; v-for=&quot;(item, key) in list&quot;&gt;
    &lt;span class=&quot;num&quot; v-text=&quot;key + 1&quot;&gt;&lt;/span&gt;
    &lt;p&gt;
      &lt;a target=&quot;_blank&quot; :href=&quot;item.url&quot; v-text=&quot;item.title&quot;&gt;&lt;/a&gt;
    &lt;/p&gt;
    &lt;p&gt;
      &lt;small&gt;
        &lt;span v-text=&quot;item.points&quot;&gt;&lt;/span&gt;
        points by
        &lt;a target=&quot;_blank&quot; :href=&quot;'https://news.ycombinator.com/user?id=' + item.author&quot;
           v-text=&quot;item.author&quot;&gt;&lt;/a&gt;
        |
        &lt;a target=&quot;_blank&quot; :href=&quot;'https://news.ycombinator.com/item?id=' + item.objectID&quot;
           v-text=&quot;item.num_comments + ' comments'&quot;&gt;&lt;/a&gt;
      &lt;/small&gt;
    &lt;/p&gt;
  &lt;/div&gt;
  &lt;infinite-loading :on-infinite=&quot;onInfinite&quot; ref=&quot;infiniteLoading&quot;&gt;
    &lt;span slot=&quot;no-more&quot;&gt;
      There is no more Hacker News :(
    &lt;/span&gt;
  &lt;/infinite-loading&gt;
&lt;/div&gt;</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2.2">&lt;div class=&quot;hacker-news-list&quot;&gt;
  &lt;div class=&quot;hacker-news-header&quot;&gt;
    &lt;a target=&quot;_blank&quot; href=&quot;http://www.ycombinator.com/&quot;&gt;
      &lt;img src=&quot;https://news.ycombinator.com/y18.gif&quot;&gt;
    &lt;/a&gt;
    &lt;span&gt;Hacker News&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class=&quot;hacker-news-item&quot; v-for=&quot;(item, key) in list&quot;&gt;
    &lt;span class=&quot;num&quot; v-text=&quot;key + 1&quot;&gt;&lt;/span&gt;
    &lt;p&gt;
      &lt;a target=&quot;_blank&quot; :href=&quot;item.url&quot; v-text=&quot;item.title&quot;&gt;&lt;/a&gt;
    &lt;/p&gt;
    &lt;p&gt;
      &lt;small&gt;
        &lt;span v-text=&quot;item.points&quot;&gt;&lt;/span&gt;
        points by
        &lt;a target=&quot;_blank&quot; :href=&quot;'https://news.ycombinator.com/user?id=' + item.author&quot;
           v-text=&quot;item.author&quot;&gt;&lt;/a&gt;
        |
        &lt;a target=&quot;_blank&quot; :href=&quot;'https://news.ycombinator.com/item?id=' + item.objectID&quot;
           v-text=&quot;item.num_comments + ' comments'&quot;&gt;&lt;/a&gt;
      &lt;/small&gt;
    &lt;/p&gt;
  &lt;/div&gt;
  &lt;infinite-loading @infinite=&quot;infiniteHandler&quot;&gt;
    &lt;span slot=&quot;no-more&quot;&gt;
      There is no more Hacker News :(
    &lt;/span&gt;
  &lt;/infinite-loading&gt;
&lt;/div&gt;</pre>
  <p>In the template, we create a header and a list for Hacker News. For <code>InfiniteLoading</code> component in this case, unlike the basic use, we customized the content of the no more data prompt base on <code>slot</code>.</p>
  <h4>Script</h4>
  <pre v-highlightjs v-if="$parent.docVersion < 1">import InfiniteLoading from 'vue-infinite-loading';

const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onInfinite() {
      this.$http.get(api, {
        params: {
          page: this.list.length / 20 + 1,
        },
      }).then((res) =&gt; {
        this.list = this.list.concat(res.data.hits);
        this.$broadcast('$InfiniteLoading:loaded');
        if (this.list.length / 20 === 10) {
          this.$broadcast('$InfiniteLoading:noMore');
        }
      });
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 1 && $parent.docVersion < 2">import InfiniteLoading from 'vue-infinite-loading';

const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onInfinite() {
      this.$http.get(api, {
        params: {
          page: this.list.length / 20 + 1,
        },
      }).then((res) =&gt; {
        if (res.data.hits.length) {
          this.list = this.list.concat(res.data.hits);
          this.$broadcast('$InfiniteLoading:loaded');
          if (this.list.length / 20 === 10) {
            this.$broadcast('$InfiniteLoading:complete');
          }
        } else {
          this.$broadcast('$InfiniteLoading:complete');
        }
      });
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2 && $parent.docVersion < 2.2">import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onInfinite() {
      axios.get(api, {
        params: {
          page: this.list.length / 20 + 1,
        },
      }).then(({ data }) =&gt; {
        if (data.hits.length) {
          this.list = this.list.concat(data.hits);
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          if (this.list.length / 20 === 10) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        } else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        }
      });
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2.2">import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    infiniteHandler($state) {
      axios.get(api, {
        params: {
          page: this.list.length / 20 + 1,
        },
      }).then(({ data }) =&gt; {
        if (data.hits.length) {
          this.list = this.list.concat(data.hits);
          $state.loaded();
          if (this.list.length / 20 === 10) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      });
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <p>
    In the <code>onInfinite</code> function, we request a page of news and pushed them into list everytime, if we had been requested 10 pages of news,
    <span v-show="$parent.docVersion < 2.2">send an <code v-show="$parent.docVersion < 1">$InfiniteLoading:noMore</code><code v-show="$parent.docVersion >= 1">$InfiniteLoading:complete</code> event</span>
    <span v-show="$parent.docVersion >= 2.2">call the <code>complete</code> method of the <code>$state</code> special event argument</span>
    to tell the <code>InfiniteLoading</code> component that there is no more data now, it will display the no more data prompt that we customized in template for user.
  </p>
</template>
