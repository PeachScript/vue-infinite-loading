<template>
  <h3>Use with filter</h3>
  <p>On basis of the Hacker News case, we create a select as a filter into the header, the list will be reload when we changed the filter.</p>

  <h4>Template</h4>
  <pre v-highlightjs>&lt;div class=&quot;hacker-news-list&quot;&gt;
  &lt;div class=&quot;hacker-news-header&quot;&gt;
    &lt;a target=&quot;_blank&quot; href=&quot;http://www.ycombinator.com/&quot;&gt;
      &lt;img src=&quot;https://news.ycombinator.com/y18.gif&quot;&gt;
    &lt;/a&gt;
    &lt;span&gt;Hacker News&lt;/span&gt;
    &lt;select v-model=&quot;tag&quot; @change=&quot;changeFilter()&quot;&gt;
      &lt;option value=&quot;story&quot;&gt;Story&lt;/option&gt;
      &lt;option value=&quot;poll&quot;&gt;Poll&lt;/option&gt;
      &lt;option value=&quot;show_hn&quot;&gt;Show hn&lt;/option&gt;
      &lt;option value=&quot;ask_hn&quot;&gt;Ask hn&lt;/option&gt;
      &lt;option value=&quot;front_page&quot;&gt;Front page&lt;/option&gt;
    &lt;/select&gt;
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
  <h4>Script</h4>
  <pre v-highlightjs v-if="$parent.docVersion < 1">import InfiniteLoading from 'vue-infinite-loading';

const api = 'http://hn.algolia.com/api/v1/search_by_date';

export default {
  data() {
    return {
      list: [],
      tag: 'story',
    };
  },
  methods: {
    onInfinite() {
      this.$http.get(api, {
        params: {
          tags: this.tag,
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
    changeFilter() {
      this.list = [];
      this.$nextTick(() =&gt; {
        this.$broadcast('$InfiniteLoading:reset');
      });
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 1">import InfiniteLoading from 'vue-infinite-loading';

const api = 'http://hn.algolia.com/api/v1/search_by_date';

export default {
  data() {
    return {
      list: [],
      tag: 'story',
    };
  },
  methods: {
    onInfinite() {
      this.$http.get(api, {
        params: {
          tags: this.tag,
          page: this.list.length / 20 + 1,
        },
      }).then((res) =&gt; {
        this.list = this.list.concat(res.data.hits);
        this.$broadcast('$InfiniteLoading:loaded');
        if (this.list.length / 20 === 10) {
          this.$broadcast('$InfiniteLoading:complete');
        }
      });
    },
    changeFilter() {
      this.list = [];
      this.$nextTick(() =&gt; {
        this.$broadcast('$InfiniteLoading:reset');
      });
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <p>
    In the <code>changeFilter</code> function, we clear the list and wait for the DOM to update, then we send an <code>$InfiniteLoading:reset</code> event to let the <code>InfiniteLoading</code> component back to the original state, it will request new data right now.
  </p>
</template>
