<template>
  <h3>Trigger manually</h3>
  <p>In most cases, we hope load data immediately for the empty list, it is also the default behavior of this component. And if you only want to control the first load, you can simply use the <code>v-if</code> and <code>v-else</code> directive to implement it:</p>
  <pre v-highlightjs>
  ...
  &lt;button @click=&quot;isTriggerFirstLoad = true&quot; v-if=&quot;!isTriggerFirstLoad&quot;&gt;Load more&lt;/button&gt;
  &lt;infinite-loading v-else&gt;&lt;/infinite-loading&gt;
  ...</pre>
  <p>And in some complex cases, for example, we need to load data manually every three pages, we can use the following workaroung to implement it:</p>

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
  &lt;button class=&quot;btn-load-more&quot; v-show=&quot;distance &lt; 0&quot; @click=&quot;manualLoad&quot;&gt;Load more&lt;/button&gt;
  &lt;infinite-loading :on-infinite=&quot;onInfinite&quot; v-ref:infinite-loading&gt;
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
  &lt;button class=&quot;btn-load-more&quot; v-show=&quot;distance &lt; 0&quot; @click=&quot;manualLoad&quot;&gt;Load more&lt;/button&gt;
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
  &lt;button class=&quot;btn-load-more&quot; v-show=&quot;distance &lt; 0&quot; @click=&quot;manualLoad&quot;&gt;Load more&lt;/button&gt;
  &lt;infinite-loading @infinite=&quot;infiniteHandler&quot; ref=&quot;infiniteLoading&quot;&gt;
    &lt;span slot=&quot;no-more&quot;&gt;
      There is no more Hacker News :(
    &lt;/span&gt;
  &lt;/infinite-loading&gt;
&lt;/div&gt;</pre>
  <p>
    In the template, we add a button to load data manually, set <code>v-show</code> directive to control hide or show, and bind a click event listener for it.
    <span v-if="$parent.docVersion < 2 || $parent.docVersion >=2.2">Then set <code v-if="$parent.docVersion < 2">v-ref</code><code v-else>ref</code> directive and bind <code>distance</code> property for the <code>infinite-loading</code> component.</span>
  </p>
  <h4>Script</h4>
  <pre v-highlightjs v-if="$parent.docVersion >= 1 && $parent.docVersion < 2">import InfiniteLoading from 'vue-infinite-loading';

const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

export default {
  data() {
    return {
      list: [],
      distance: -Infinity,
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
          } else if (res.data.page % 3 === 0) {
            this.distance = -Infinity;
          }
        } else {
          this.$broadcast('$InfiniteLoading:complete');
        }
      });
    },
    manualLoad() {
      this.distance = 100;
      this.$nextTick(() => {
        this.$refs.infiniteLoading.attemptLoad();
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
      distance: -Infinity,
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
          } else if (data.page % 3 === 0) {
            this.distance = -Infinity;
          }
        } else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        }
      });
    },
    manualLoad() {
      this.distance = 100;
      this.$nextTick(() => {
        this.$refs.infiniteLoading.attemptLoad();
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
      distance: -Infinity,
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
          } else if (data.page % 3 === 0) {
            this.distance = -Infinity;
          }
        } else {
          $state.complete();
        }
      });
    },
    manualLoad() {
      this.distance = 100;
      this.$nextTick(() => {
        this.$refs.infiniteLoading.attemptLoad();
      });
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <p>
    In the script, we set the <code>distance</code> to <code>-Infinite</code> by default, then we create a <code>manualLoad</code> function to change the <code>distance</code> to a positive value and trigger load manually, lastly, in the <code>onInfinite</code> function, we reset the <code>distance</code> to <code>-Infinite</code> every three pages.
  </p>
  <p>That's all, you can preview it on the right, hope it is useful!</p>
</template>
