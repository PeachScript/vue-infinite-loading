<template>
  <h3>Installation</h3>
  <pre v-highlightjs v-if="$parent.docVersion < 1">npm install vue-infinite-loading@^0 --save</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 1 && $parent.docVersion < 2">npm install vue-infinite-loading --save</pre>
  <pre v-highlightjs v-if="$parent.docVersion >= 2">npm install vue-infinite-loading@next --save</pre>
  <h3>Import</h3>
  <h4>ES6</h4>
  <pre v-highlightjs>import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading,
  },
};</pre>

  <h4>CommonJS</h4>
  <pre v-highlightjs>const InfiniteLoading = require('vue-infinite-loading');

export default {
  components: {
    InfiniteLoading,
  },
};</pre>

  <h4>Others</h4>
  <p>The InfiniteLoading component will register with the global Vue automatically, so you just need import it into your APP like this way:</p>
  <pre v-highlightjs>&lt;script src=&quot;/path/to/vue-infinite-loading/dist/vue-infinite-loading.js&quot;&gt;&lt;/script&gt;</pre>
</template>
