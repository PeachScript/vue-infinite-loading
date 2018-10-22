# Configure Load Messages

This component provide four different slots use to display different load messages: `spinner`, `no-more`, `no-results`, `error`, you can read more about it in [here](../api/#slots).

## Via `slot` Sepcial Attribute

We can use the [`slot` special attribute](https://vuejs.org/v2/api/index.html#slot) to configure them:

``` html
<infinite-loading>
  <div slot="spinner">Loading...</div>
  <div slot="no-more">No more message</div>
  <div slot="no-results">No results message</div>
</infinite-loading>
```

Unlike other slots, the default value for the `error` slot will provide a retry button for users to load data again. If you want to impletement a retry button for users when you customize the `error` slot, you can use the [`slot-scope`](https://vuejs.org/v2/api/index.html#slot-scope) feature, like this:

``` html
<infinite-loading>
  <div slot="error" slot-scope="{ trigger }">
    Error message, click <a href="javascript:;" @click="trigger">here</a> to retry
  </div>
</infinite-loading>
```

## Via Plugin API

In order to maintain consistent behavior for all load message when we building large application, this plugin support configure all slot using the plugin API, we just need to pass a string or Vue component for it, click [here](./configure-plugin-opts.md#slots) to read more about it.

The `error` slot is still the special one in this way, same as the `slot` special attribute way, if you want to impletement a retry button for users in your own error component, you can use the [`vm.$attrs`](https://cn.vuejs.org/v2/api/#vm-attrs) property, like this:

``` html
<!-- your own error component -->
<div>
  Error message, click
  <a href="javascript:;" @click="$attrs.trigger">here</a>
  to retry
</div>
```

If you want to keep variable clear, you also can define a function property named `trigger`, and bind it on your retry button:

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
