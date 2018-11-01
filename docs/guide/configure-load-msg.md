---
previewLink: //jsfiddle.net/PeachScript/94kL0bvs/embedded/result/
---

# Configure Load Messages

This component provide four different slots use to display different load messages: `spinner`, `no-more`, `no-results`, `error`, all the default values are listed in the preview container on the right, you can read more about them in [here](../api/#slots).

## Via Component Prop

Only the `spinner` slot can be configured via the prop, and the set value can only be the built-in spinner type:

``` html
<infinite-loading spinner="spiral"></infinite-loading>
```

You can preview all built-in spinner types on the right, please use other ways if you want to create your own spinner.

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

## About Hide & Default Styles

For easy to use, this component provide some default styles (`font-size`, `color` and `padding`) for slot content, if you want to keep all default styles when you configure via `slot` special attribute, you have to wrap the content with `template` tag:

``` html
<infinite-loading>
  <!-- The no-more message will has default styles -->
  <template slot="no-more">No more message</template>
</infinite-loading>

```

If you want to hide a slot, you can create an empty element that is not a `template` element, because the empty `template` element will be ignored by Vue.js:

``` html
<infinite-loading>
  <!-- The no-more slot will not be displayed -->
  <span slot="no-more"></span>
</infinite-loading>
```

If you want to remove all default styles to avoid affecting your own styles, you can wrap the content with an element that is not a `template` element:

``` html
<infinite-loading>
  <!-- The no-more message will has no default styles -->
  <div slot="no-more">No more message</div>
</infinite-loading>
```

Almost forgot, if you want to configure slot content globally via plugin API, you can control them like this:

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
