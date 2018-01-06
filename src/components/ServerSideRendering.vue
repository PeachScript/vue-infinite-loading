<template>
  <h3>Server-Side Rendering</h3>
  <p>Server-Side Rendering(SSR) is a <a target="_blank" href="https://vuejs.org/v2/guide/ssr.html">new official feature</a> in <code>Vue.js 2.0</code>, but we will get an error like this when you use this component in your SRR app:</p>
  <pre v-highlightjs>
Error: window is not defined

ReferenceError: window is not defined
    at ...
    at ...
    at e.exports (...)
    at Object. (...)
    at p (...)
    at Object.e.exports.render.e (...)
    at p (...)
    at Object. (...)
    at p (...)
    at e.__esModule.default (...)
  </pre>
  <p>Because the <code>style-loader</code> does not support local export at this time, details in <a target="_blank" href="https://github.com/webpack/style-loader/pull/159">here</a>, so we need this workaround for your SSR app:</p>
  <ol>
    <li>
      use
      <pre v-highlightjs>import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue';</pre>
      instead of
      <pre v-highlightjs>import InfiniteLoading from 'vue-infinite-loading';</pre></li>
    <li><code>npm install less less-loader --save-dev</code> if you have not installed them.</li>
  </ol>
  <p>After them, your SSR app should running well, if not, you can join <a target="_blank" href="https://github.com/PeachScript/vue-infinite-loading/issues/18">this issue</a> to discuss it.</p>
</template>
