# 配置插件选项

我们可以通过插件 API 配置该插件的默认属性、默认插槽以及默认系统配置，它们将会作为你项目中的所有 `InfiniteLoading` 组件的默认值，你仍然可以通过每个组件的属性及插槽对它们进行覆盖。

## 属性/设置

只需要传递一个包含 `props`/`settings` 字段的对象就可以配置它们了，点击[这里](../api/#选项)查看所有可用的选项。

``` js
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, {
  props: {
    spinner: 'default',
    /* other props need to configure */
  },
  system: {
    throttleLimit: 50,
    /* other settings need to configure */
  },
});
```

## 插槽

和属性及配置不一样，插槽选项可以是一个字符串，也可以是一个 `Vue Component`：

``` js
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import InfiniteError from 'path/to/your/components/InfiniteError';

Vue.use(InfiniteLoading, {
  slots: {
    noMore: 'No more message', // you can pass a string value
    error: InfiniteError, // you also can pass a Vue component as a slot
  },
});
