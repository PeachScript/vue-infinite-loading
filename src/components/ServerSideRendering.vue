<template>
  <h3>Server-Side Rendering</h3>
  <p>Server-Side Rendering(SSR) is a <a target="_blank" href="https://vuejs.org/v2/guide/ssr.html">new official feature</a> in <code>Vue.js 2.0</code>, but this plugin depends on multiple DOM APIs, so it is no support SSR.</p>
  <p>If you created SSR project with other framework which has <code>no-ssr</code> component such as <a target="_blank" href="https://nuxtjs.org/api/components-no-ssr#the-lt-no-ssr-gt-component">Nuxt</a>, please wrap <code>infinite-loading</code> component with it to make sure SSR work properly:</p>
  <pre v-highlightjs>
&lt;no-ssr&gt;
  &lt;infinite-loading&gt;&lt;/infinite-loading&gt;
&lt;/no-ssr&gt;</pre>
  <p>If you created SSR project manually, you can use <a href="https://github.com/egoist/vue-no-ssr">vue-no-ssr</a> component to implement it.</p>
  <p>After them, your SSR app should running well, if not, you can join <a target="_blank" href="https://github.com/PeachScript/vue-infinite-loading/issues/18">this issue</a> to discuss it.</p>
</template>
