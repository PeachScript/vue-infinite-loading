---
sidebar: auto
---

# API

## 属性

所有属性都可以通过插件 API 改写全局默认值。

### distance

- 类型：`Number`
- 默认值：`100`
- 详细：

当滚动条的距离小于此值时，`infinite` 事件将会被触发。如果 `direction` 的值是 `top`，则计算滚动条距离顶部的距离；如果 `direction` 的值是 `bottom`，则计算滚动条距离底部的距离。

### spinner

- 类型：`String`
- 默认值：`default`
- 有效值：`default` | `spiral` | `circles` | `bubbles` | `waveDots`
- 详细：

此选项用于设置加载动画，你可以从内置选项中选择一个你喜欢的，你也可以通过名为 `spinner` 的[具名插槽](https://vuejs.org/v2/guide/components.html#Named-Slots)来进行自定义。

### direction

- 类型：`String`
- 默认值：`bottom`
- 有效值：`top` | `bottom`
- 详细：

此选项用于设置滚动加载的方向。

### forceUseInfiniteWrapper

- 类型：`Boolean` | `String`
- 默认值：`false`
- 详细：

默认情况下，该组件会寻找最近的具备 `overflow-y: auto | scroll` CSS 样式的父元素，作为监听滚动事件的目标元素，此选项用于强制指定滚动元素，通常用于有复杂布局或第三方滚动组件（例如 [`perfect-scrollbar`](https://github.com/noraesae/perfect-scrollbar)）的场景。

如果该值为 `true`，则会向上查找最近的具备 `infinite-wrapper` 属性的父元素作为滚动容器；如果该值为一个字符串，则会将该值当作 CSS 选择器并使用 `querySelector` 查找该元素，将其作为滚动容器；如果以上两种情况都找不到目标元素，则会使用 `window` 作为滚动容器。

### identifier

- 类型：`any`
- 默认值：`+new Date()`
- 详细：

该组件会在此值改变时对组件进行重设，就像重新创建了一个新的组件一样，通常用于过滤器或者选项卡的场景。

## 插槽

插槽的内容可以通过 `Vue.js` 官方提供的 [`slot` 特殊属性](https://vuejs.org/v2/api/index.html#slot)进行设置，也可以通过插件 API 进行全局设置。

### no-results

- 默认值：`No results :(`
- 详细：

该信息将会在没有加载到任何数据时呈现给用户，即没有调用过 `$state.loaded` 方法就调用了 `$state.complete` 方法。

### no-more

- 默认值：`No more data :)`
- 详细：

该信息将会在所有数据都已经加载完时呈现给用户，即调用过 `$state.loaded` 方法之后调用了 `$state.complete` 方法。

### error

- 默认值：`Opps, something went wrong :(`
- 详细：

该信息将会在加载出现错误时呈现给用户，即调用 `$state.error` 方法时。

与其他插槽不同的是，该插槽的默认值除了会提供文字信息之外，还会提供一个重试按钮供用户重新尝试加载；在自定义该插槽时，如果你也希望提供一个重试按钮给用户，可以使用 [`slot-scope`](https://vuejs.org/v2/api/index.html#slot-scope) 功能实现，就像下面这样：

``` html
<infinite-loading @infinite="infiniteHandler">
  <div slot="error" slot-scope="{ trigger }">
    Network error, click <a href="javascript:;" @click="trigger">here</a> to retry
  </div>
</infinite-loading>
```

## 事件

### infinite

- 参数：`event`
- 详细：

该事件将会在滚动距离小于 `distance` 属性时被触发，组件会传递一个特殊的事件参数给事件监听器，用于改变组件的加载状态，通常我们将其命名为 `$state`，它包含以下几个方法：

#### $state.loaded

通知组件此次加载已经顺利完成，如果此时数据仍然没有填满首屏，`infinite` 事件将会被再次触发；反之，组件将会关闭加载动画并继续监听滚动事件。

#### $state.complete

通知组件所有的数据已经加载完成，如果调用此方法前没有调用过 `$state.loaded`，那么插槽 `no-results` 的内容将会被展示；如果调用此方法前调用过 `$state.loaded`，那么插槽 `no-more` 的内容将会被展示。

#### $state.error

通知组件此次加载失败了，插槽 `error` 的内容将会被展示。

#### $state.reset

重设组件状态，等同于改变 `identifier` 属性。
