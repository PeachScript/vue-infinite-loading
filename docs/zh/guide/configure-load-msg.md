# 配置加载提示

此组件提供了四种不同的插槽用来显示不同的加载提示：`spinner`、`no-more`、`no-results`、`error`，你可以通过[这里](../api/#插槽)了解更多。

## 通过 `slot` 特殊属性

我们可以通过 [`slot` 特殊属性](https://vuejs.org/v2/api/index.html#slot)来配置它们：

``` html
<infinite-loading>
  <div slot="spinner">Loading...</div>
  <div slot="no-more">No more message</div>
  <div slot="no-results">No results message</div>
</infinite-loading>
```

与其他插槽不同的是，`error` 插槽的默认值除了会提供文字信息之外，还会提供一个重试按钮供用户重新尝试加载；在自定义 `error` 插槽时，如果你也希望提供一个重试按钮给用户，可以使用 [`slot-scope`](https://vuejs.org/v2/api/index.html#slot-scope) 功能实现，就像下面这样：

``` html
<infinite-loading>
  <div slot="error" slot-scope="{ trigger }">
    Error message, click <a href="javascript:;" @click="trigger">here</a> to retry
  </div>
</infinite-loading>
```

## 通过插件 API

在我们构建大型应用时，为了保证所有加载提示的行为一致，此插件支持通过插件 API 统一配置所有的插槽内容，我们只需要传递一个字符串或者 Vue 组件给它就可以了，点击[这里](./configure-plugin-opts.md#插槽)了解更多。

在这里 `error` 插槽仍然是最特殊的哪一个，和使用 `slot` 特殊属性一样，如果你希望提供一个重试按钮给用户，你可以使用 [`vm.$attrs`](https://cn.vuejs.org/v2/api/#vm-attrs) 属性，就像这样：

``` html
<!-- your own error component -->
<div>
  Error message, click
  <a href="javascript:;" @click="$attrs.trigger">here</a>
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
