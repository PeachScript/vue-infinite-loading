---
previewLink: //jsfiddle.net/PeachScript/a4Lxbf9w/embedded/result/
---
# 指南

## 安装插件

### NPM

推荐在构建大型应用的时候使用这种方式进行安装。

``` bash
npm install vue-infinite-loading -S
```

### 直接使用 `<script>` 引入

在使用 `script` 标签引入此插件后，`InfiniteLoading` 组件会被自动注册到全局，开发时直接进行使用即可。

#### CDN

你可以借助 [unpkg](https://unpkg.com) 引入此插件：

``` html
<script src="https://unpkg.com/vue-infinite-loading@^2/dist/vue-infinite-loading.js"></script>
```

#### 手动引入

你也可以下载插件文件后手动引入：

<a target="_blank" href="https://github.com/PeachScript/vue-infinite-loading/raw/master/dist/vue-infinite-loading.js" class="button button-small button-basic">下载插件</a>

## 引用插件

### 组件形式

你可以直接将它当做一个自定义组件进行引用：

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

### 插件 API

如果你需要改变插件的默认配置，那么可以采用 Vue.js 提供的 `use` API 对此插件进行注册：

``` js
// main.js or index.js
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, { /* 配置 */ });
```

和 `script` 引入方式一样，使用插件 API 也会将 `InfiniteLoading` 组件注册为全局组件，在你自己的组件中就无需再使用 `components` 属性重复注册了。
