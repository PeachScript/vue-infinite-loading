<template>
  <h3>Use with 3rd-party scroll plugin</h3>
  <p>If you want to use this plugin with 3rd-party scroll plugin like <a target="_blank" href="https://github.com/noraesae/perfect-scrollbar">perfect-scrollbar</a>, you can set a special attribute called <code>infinite-wrapper</code> for your real scroll parent, this plugin will find the closest container which has <code>overflow-y: auto;</code> CSS style or has <code>infinite-wrapper</code> attribute as the scroll parent and listen it's scroll event.</p>
  <p>The template should be like this:</p>
  <pre v-highlightjs>
&lt;div id=&quot;perfect-scroll-wrapper&quot; ref=&quot;scrollWrapper&quot; infinite-wrapper&gt;
  &lt;ul&gt;
    &lt;li v-for=&quot;item in list&quot; v-text=&quot;item&quot;&gt;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;infinite-loading :on-infinite=&quot;onInfinite&quot; ref=&quot;infiniteLoading&quot;&gt;&lt;/infinite-loading&gt;
&lt;/div&gt;</pre>
  <p>Script:</p>
  <pre v-highlightjs>
import Ps from 'perfect-scrollbar';

export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    Ps.initialize(this.$refs.scrollWrapper);
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
        this.$nextTick(() => {
          Ps.update(this.$refs.scrollWrapper);
        });
      }, 1000);
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
<p>Now it will work properly with <code>perfect-scrollbar</code>!</p>
<h4>With iScroll (or other plugin like it)</h4>
<p>If you use this plugin with <a target="_blank" href="https://github.com/cubiq/iscroll"><code>iScroll</code></a>, it cannot work directly with <code>iScroll</code>, because the <code>iScroll</code> will not fire the scroll event after smooth scrolling, even if it can, this plugin also cannot get the correct <code>scrollTop</code> by strandard way, so we must use the following workaround:</p>
<pre v-highlightjs>
import iScroll from 'iscroll/iscroll-probe';

export default {
  data() {
    return {
      list: [],
      iScroll,
    };
  },
  mounted() {
    this.iScroll = new IScroll(this.$refs.scrollWrapper, {
      probeType: 3, // see http://iscrolljs.com/#custom-events
    });
    this.iScroll.on('scroll', () => {
      let shouldBeCalled; // you should calculate the scroll top manually
      if (shouldBeCalled) {
        this.$refs.infiniteLoading.isLoading = true; // display the spinner manually
        this.onInfinite(); // call the callback manually
      }
    });
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
        this.$nextTick(() => {
          this.iScroll.refresh();
        });
      }, 1000);
    },
  },
  components: {
    InfiniteLoading,
  },
};</pre>
<p>But is an ugly way, so if you have any good idea to solve it, please feedback to me in <a target="_blank" href="https://github.com/PeachScript/vue-infinite-loading/issues/44">this issue</a>, thank you very much!</p>
</template>
