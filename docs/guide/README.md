---
previewLink: //jsfiddle.net/PeachScript/a4Lxbf9w/embedded/result/
---
# Guide

## Installation

### NPM

If you are building a large application, we recommend you use the following method:

``` bash
npm install vue-infinite-loading -S
```

### Direct `<script>` Include

After you import this plugin through the `script` tag, it will register the `InfiniteLoading` component automatically, so you can use it in the global scope.

#### CDN

You can import this plugin from [unpkg](https://unpkg.com):

``` html
<script src="https://unpkg.com/vue-infinite-loading@^2/dist/vue-infinite-loading.js"></script>
```

#### Manual

You can also download and import it manually:

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

If you want to configure default options, you can register this plugin through the `use` API of Vue.js:

``` js
// main.js or index.js
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, { /* options */ });
```

If you use the plugin API, the `InfiniteLoading` component will be registered as a global component just like when including it with the `script` tag, but you won't need to re-register it through the `components` property in your own components.
