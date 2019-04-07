---
previewLink: //jsfiddle.net/PeachScript/94kL0bvs/embedded/result/
---

# 配置加载提示

此组件提供了四种不同的插槽用来显示不同的加载提示：`spinner`、`no-more`、`no-results`、`error`，所有插槽的默认值都在右边的预览中列出来了，你还可以通过[这里](../api/#插槽)了解更多。

## 通过组件 Prop

只有 `spinner` 插槽可以通过 prop 进行配置，并且此时的设定值只能是内置的动画类型：

``` html
<infinite-loading spinner="spiral"></infinite-loading>
```

你可以在右边预览所有内置加载动画，如果你希望创建自己的加载动画，请使用其他方式。

## 通过 `v-slot` 指令

::: warning
Vue.js 官方于 v2.6.0 后[废弃 slot 特殊特性](https://cn.vuejs.org/v2/api/#slot-废弃)，推荐使用[v-slot 指令](https://cn.vuejs.org/v2/api/#v-slot)。
:::

我们可以通过[`v-slot` 指令](https://cn.vuejs.org/v2/api/#v-slot)来配置它们：

``` html
<infinite-loading>
  <div v-slot:spinner>Loading...</div>
  <div v-slot:no-more>No more message</div>
  <div v-slot:no-results>No results message</div>
</infinite-loading>
```

与其他插槽不同的是，`error` 插槽的默认值除了会提供文字信息之外，还会提供一个重试按钮供用户重新尝试加载；在自定义 `error` 插槽时，如果你也希望提供一个重试按钮给用户，可以接收 prop 中的重試的方法 `trigger` 並注入到按鈕，就像下面这样：

``` html
<infinite-loading>
  <div v-slot:error="{ trigger }">
    Error message, click <a href="#retry" @click.prevent="trigger">here</a> to retry
  </div>
</infinite-loading>
```

## 通过插件 API

在我们构建大型应用时，为了保证所有加载提示的行为一致，此插件支持通过插件 API 统一配置所有的插槽内容，我们只需要传递一个字符串或者 Vue 组件给它就可以了，点击[这里](./configure-plugin-opts.md#插槽)了解更多。

在这里 `error` 插槽仍然是最特殊的哪一个，和使用 `v-slot` 指令一样，如果你希望提供一个重试按钮给用户，你可以使用 [`vm.$attrs`](https://cn.vuejs.org/v2/api/#vm-attrs) 属性，就像这样：

``` html
<!-- your own error component -->
<div>
  Error message, click
  <a href="#retry" @click.prevent="$attrs.trigger">here</a>
  to retry
</div>
```

如果你想保持变量名的整洁，你也可以定义一个叫做 `trigger` 的函数属性，并且把它绑定到重试按钮上即可：

``` js
// your own error component
export default {
  /* ... */
  props: {
    trigger: Function,
  },
  /* ... */
};
```

## 关于隐藏与默认样式

为了便于使用，该组件为插槽内容提供了一些默认样式（`font-size`、`color` 和 `padding`），如果你希望在通过 `v-slot` 指令配置插槽时保持默认样式的存在，你需要将插槽内容用 `template` 标签包裹：

``` html
<infinite-loading>
  <!-- The no-more message will has default styles -->
  <template v-slot:no-more>No more message</template>
</infinite-loading>

```

如果你希望隐藏某个插槽，你可以创建一个不是 `template` 标签的空元素，因为 Vue.js 会忽略空的 `template` 元素：

``` html
<infinite-loading>
  <!-- The no-more slot will not be displayed -->
  <span v-slot:no-more></span>
</infinite-loading>
```

如果你希望移除默认样式以避免影响自己的样式，你可以将插槽内容用不是 `template` 标签的元素包裹：

``` html
<infinite-loading>
  <!-- The no-more message will has no default styles -->
  <div v-slot:no-more>No more message</div>
</infinite-loading>
```

差点忘了，如果你想通过插件 API 全局配置插槽内容，可以像这样进行控制：

``` js
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import InfiniteError from 'path/to/your/components/InfiniteError',

Vue.use(InfiniteLoading, {
  slots: {
    // keep default styles
    noResults: 'No results message',

    // remove default styles
    noMore: InfiniteError,

    // hide slot
    error: {
      render: h => h('div'),
    },
  },
});
```
