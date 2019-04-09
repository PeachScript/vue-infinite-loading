---
previewLink: //jsfiddle.net/PeachScript/94kL0bvs/embedded/result/
---

# Configure Load Messages

This component provides four different slots that you can use to display different load messages: `spinner`, `no-more`, `no-results`, `error`. All of the default values are listed in the preview container on the right, and you can read more about them [here](../api/#slots).

## Via Component Prop

Only the `spinner` slot can be configured via the prop, and the set value can only be the built-in spinner type:

``` html
<infinite-loading spinner="spiral"></infinite-loading>
```

You can preview all built-in spinner types on the right. Please use other ways if you want to create your own spinner.

## Via `slot` Special Attribute

We can use the [`slot` special attribute](https://vuejs.org/v2/api/index.html#slot) to configure them:

``` html
<infinite-loading>
  <div slot="spinner">Loading...</div>
  <div slot="no-more">No more message</div>
  <div slot="no-results">No results message</div>
</infinite-loading>
```

Unlike other slots, the default value for the `error` slot will provide a retry button for users to load the data again. If you want to implement a retry button for users when you customize the `error` slot, you can use the [`slot-scope`](https://vuejs.org/v2/api/index.html#slot-scope) feature, like this:

``` html
<infinite-loading>
  <div slot="error" slot-scope="{ trigger }">
    Error message, click <a href="javascript:;" @click="trigger">here</a> to retry
  </div>
</infinite-loading>
```

## Via Plugin API

In order to maintain consistent behavior for all load messages when we are building a large application, this plugin supports configuration on all slots using the plugin API. We just need to pass a string or Vue component to it, click [here](./configure-plugin-opts.md#slots) to read more about that.

The `error` slot is still special in this way. Just as with the `slot` special attribute, if you want to implement a retry button for users in your own error component, you can use the [`vm.$attrs`](https://cn.vuejs.org/v2/api/#vm-attrs) property, like this:

``` html
<!-- your own error component -->
<div>
  Error message, click
  <a href="javascript:;" @click="$attrs.trigger">here</a>
  to retry
</div>
```

If you want to keep variables clear, you can also define a function property named `trigger`, and bind it to your retry button:

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

For easy use, this component provides some default styles (`font-size`, `color` and `padding`) for slot content. If you want to keep all default styles when you configure via the `slot` special attribute, you have to wrap the content with a `template` tag:

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

I almost forgot, if you want to configure the slot content globally via the plugin API, you can control it like this:

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
