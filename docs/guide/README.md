---
previewLink: //jsfiddle.net/PeachScript/zqb73oLv/embedded/result/
---
# Guide

## Installation

### NPM

If you are building big application now, recommend you use the way.

``` bash
npm install vue-infinite-loading -S
```

### Direct `<script>` Include

After you imported this plugin through `script` tag, it will register `InfiniteLoading` component automatically, so you can use it in globally.

#### CDN

You can import this plugin from [unpkg](https://unpkg.com):

``` html
<script src="https://unpkg.com/vue-infinite-loading@2.3.5/dist/vue-infinite-loading.js"></script>
```

#### Manual

You also can download and import it manually:

<a target="_blank" href="https://github.com/PeachScript/vue-infinite-loading/raw/master/dist/vue-infinite-loading.js" class="button button-small button-basic">Download</a>

## Import

### Component

You can import it as a custom component:

``` vue
<template>
  <infinite-loading></infinite-loading>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading,
  },
};
</script>
```

### Plugin API

If you want to configure default options, you can register this plugin through `use` API of Vue.js:

``` js
// main.js or index.js
import InfiniteLoading from 'vue-infinite-loading;

Vue.use(InfiniteLoading, { /* options */ });
```

Same as the `script` include way, the `InfiniteLoading` component will be registered as a global comopnent if use the plugin API, you don't need to re-register it through `components` property in your own components.
