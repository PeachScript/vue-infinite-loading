---
sidebar: auto
---

# API

## Props

The default value for these properties can be overridden through the Plugin API.

### distance

- Type: `Number`
- Default: `100`
- Details: 

The `infinite` event will be fired if the scroll distance is less than this value. If `direction` is set to `top`, it will calculate the distance between the scroll bar and the top, if `direction` is set to `bottom`, it will calculate the distance between the scroll bar and the bottom.

### spinner

- Type: `String`
- Default: `default`
- Available: `default` | `spiral` | `circles` | `bubbles` | `waveDots`
- Details: 

This property is used to set the loading animation, you can choose one from the internal spinners that you like, you can also customize it with a [named slot](https://vuejs.org/v2/guide/components.html#Named-Slots) that called `spinner`.

### direction

- Type: `String`
- Default: `bottom`
- Available: `top` | `bottom`
- Details: 

This property is used to set the load direction.

### forceUseInfiniteWrapper

- Type: `Boolean` | `String`
- Default: `false`
- Details: 

By default, the component will search for the closest parent element which has `overflow-y: auto | scroll` CSS style as the scroll container, this property is used to force to specify the scroll container, usually used when the case has complex layout or 3rd-party scroll plugin (eg: [`perfect-scrollbar`](https://github.com/noraesae/perfect-scrollbar)).

If this value set be `true`, the component will search the closest parent element which has `infinite-wrapper` attribute as the scroll container, if this value is a string, the component will use it as a CSS selector, and search the element as the scroll container via the `querySelector` API, if all failed, the component will use `window` as the scroll container.

### identifier

- Type: `any`
- Default: `+new Date()`
- Details: 

The comopnent will be reset if this property has changed, just like recreating a new comopnent, usually used when the case has filter or tabs.

## Slots

The contents for these slots can be configured via the [`slot` special attribute](https://vuejs.org/v2/api/index.html#slot), also can be configure via the plugin API.

### no-results

- Default: `No results :(`
- Details: 

This message will be displayed if there is no data, it means we did not call the `$state.loaded` method before calling the `$stat.complete` method.

### no-more

- Default: `No more data :)`
- Details: 

This message will be displayed if there is no more data, it means we called the `$state.loaded` method before calling the `$state.complete` method.

### error

- Default: `Opps, something went wrong :(`
- Details: 

This message will be displayed if loading failed, it means we called the `$state.error` method.

Unlike other slots, the default value for this slot will provide a retry button for users to load data again. If you want to impletement a retry button for users when you customize this slot, you can use the [`slot-scope`](https://vuejs.org/v2/api/index.html#slot-scope) feature, like this:

``` html
<infinite-loading @infinite="infiniteHandler">
  <div slot="error" slot-scope="{ trigger }">
    Network error, click <a href="javascript:;" @click="trigger">here</a> to retry
  </div>
</infinite-loading>
```

## Events

### infinite

- Argument: `event`
- Details:

This event will be fired if the scroll distance is less than the `distance` property, the component will pass a special event argument for the event handler to change loading status, usually we name it `$state`, include these methods:

#### $state.loaded

Inform the component that this loading has been successful, and the `infinite` event will be fired again if the first screen was not be filled up, otherwise, the component will hide the loading animation and continue to listen scroll event.

#### $state.complete

Inform the component that all the data has been loaded successfully, if the `$state.loaded` method has not been called before this, the content of `no-results` slot will be displayed, otherwise, the content of `no-more` slot will be displayed.

#### $state.error

Inform the comopnent that this loading failed, the content of `error` slot will be diplayed.

#### $state.reset

Reset the component, same as changing the `identifier` property.
