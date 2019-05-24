---
previewLink: //jsfiddle.net/PeachScript/uyjb6z34/embedded/result/
---

# 和 Element UI 一起使用

此前有一些关于如何将此插件与 Element UI 的表格组件一起使用的问题，所以这里提供一个示例以作参考。

和标准的表格组件一起使用很简单，将 `InfiniteLoading` 组件放在表格组件下方即可；但与带滚动条的表格组件一起使用，在创建模板时就需要注意以下两点：

1. 需要使用 Element UI 表格组件提供的名为 `append` 的[插槽](http://element-cn.eleme.io/#/zh-CN/component/table#table-slot)，将 `InfiniteLoading` 组件放入表格末尾；
2. 由于 Element UI 表格组件的滚动条是根据内容高度动态触发的，该插件无法自动找到正确的滚动容器，需要将 `forceUseInfiniteWrapper` 属性设置为真实滚动容器的 CSS 选择器进行强制指定。

::: warning 注意
如果在同一个页面中有多个 Element UI 表格组件，我们需要用更加详细的 CSS 选择器来替代 `.el-table__body-wrapper`，否则组件可能会把错误的表格组件当做滚动容器
:::

最后模板应该大致如此：

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

逻辑中无需做任何特殊处理，组件便可以像右边的预览一样正常工作了。
