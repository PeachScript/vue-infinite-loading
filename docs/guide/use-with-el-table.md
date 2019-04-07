---
previewLink: //jsfiddle.net/PeachScript/uyjb6z34/embedded/result/
---

# Use With Element UI

There were some issues before regarding how to use this plugin with the table component of the Element UI, so here is a case for reference.

It is easy to use this plugin with the standard table component! Just place the `InfiniteLoading` component under the table component, but we need to pay attention to the following 2 points when writing a template if we use this plugin with the scrollable table component:

1. Place the `InfiniteLoading` component at the end of the table component via a [slot](https://element.eleme.io/#/en-US/component/table#table-slot) named `append` in the Element UI table component;
2. Set the `forceUseInfiniteWrapper` property to the CSS selector of the real scroll container. Because the scroll bar of the Element UI table component is enabled dynamically according to the content height, this plugin cannot find the correct scroll container automatically.

::: warning
If there are multiple Element UI table components on the same page, we need a more detailed CSS selector instead of the `.el-table__body-wrapper`. If not, this plugin may find an error table component as the scroll container
:::

The final template should be similar to:

``` html {6,8}
<div id="app">
  <el-table>
    <!-- el-table-column items -->

    <infinite-loading
      v-slot:append
      @infinite="infiniteHandler"
      force-use-infinite-wrapper=".el-table__body-wrapper">
    </infinite-loading>
  </el-table>
</div>
```

No special handling is required in the logic. This plugin should alread work, just like the preview on the right!
