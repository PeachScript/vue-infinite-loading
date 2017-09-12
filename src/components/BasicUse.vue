<template>
  <h3>Basic Use</h3>
  <p>In this case, we will create a basic infinite list like the demo on the right, with three steps:</p>
  <ol>
    <li>Create a list base on <code>v-for</code> in your template;</li>
    <li>Put the <code>InfiniteLoading</code> component on the bottom of the list;</li>
    <li v-show="$parent.docVersion >= 2 && $parent.docVersion < 2.2">Set a <code>ref</code> attribute on <code>InfiniteLoading</code> component to <code>$emit</code> event for it;</li>
    <li v-show="$parent.docVersion < 2.2">Create and bind a loading callback function for <code>InfiniteLoading</code> component.</li>
    <li v-show="$parent.docVersion >= 2.2">Listen the <code>infinite</code> event on the <code>InfiniteLoading</code> component.</li>
  </ol>
  <h4>Template</h4>
  <pre v-highlightjs v-if="$parent.docVersion < 2">&lt;div&gt;
  &lt;p v-for=&quot;item in list&quot;&gt;
    Line:
    &lt;span v-text=&quot;item&quot;&gt;&lt;/span&gt;
  &lt;/p&gt;
  &lt;infinite-loading :on-infinite=&quot;onInfinite&quot;&gt;&lt;/infinite-loading&gt;
&lt;/div&gt;</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2 && $parent.docVersion < 2.2">&lt;div&gt;
  &lt;p v-for=&quot;item in list&quot;&gt;
    Line:
    &lt;span v-text=&quot;item&quot;&gt;&lt;/span&gt;
  &lt;/p&gt;
  &lt;infinite-loading :on-infinite=&quot;onInfinite&quot; ref=&quot;infiniteLoading&quot;&gt;&lt;/infinite-loading&gt;
&lt;/div&gt;</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2.2">&lt;div&gt;
  &lt;p v-for=&quot;item in list&quot;&gt;
    Line:
    &lt;span v-text=&quot;item&quot;&gt;&lt;/span&gt;
  &lt;/p&gt;
  &lt;infinite-loading @infinite=&quot;infiniteHandler&quot;&gt;&lt;/infinite-loading&gt;
&lt;/div&gt;</pre>
  <h4>Script</h4>
  <pre v-highlightjs v-if="$parent.docVersion < 2">import InfiniteLoading from 'vue-infinite-loading';

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onInfinite() {
      setTimeout(() =&gt; {
        const temp = [];
        for (let i = this.list.length + 1; i &lt;= this.list.length + 20; i++) {
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
};</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2 && $parent.docVersion < 2.2">import InfiniteLoading from 'vue-infinite-loading';

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onInfinite() {
      setTimeout(() =&gt; {
        const temp = [];
        for (let i = this.list.length + 1; i &lt;= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
      }, 1000);
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2.2">import InfiniteLoading from 'vue-infinite-loading';

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(() =&gt; {
        const temp = [];
        for (let i = this.list.length + 1; i &lt;= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        $state.loaded();
      }, 1000);
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
  <p>
    In the <code>onInfinite</code> function, we pushed 20 numbers into the list everytime, and we simulate async request by <code>setTimeout</code>.
    <span v-show="$parent.docVersion < 2.2">Finally, don't forget send an <code>$InfiniteLoading:loaded</code> event</span>
    <span v-show="$parent.docVersion >= 2.2">Finally, don't forget call the <code>loaded</code> method of the <code>$state</code> special event argument</span>
    , it will tell the <code>InfiniteLoading</code> component that the data was loaded successfully.
  </p>
  <p>Now, we get a infinite list like the demo on the right!</p>
</template>
