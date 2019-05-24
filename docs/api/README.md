---
sidebar: auto
---

# API

## Props

The default value for most of properties can be overridden through the Plugin API.

- See also: [Configure Plugin Options - Props/Settings](../guide/configure-plugin-opts.md#props-settings)

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

This property is used to set the loading animation, you can choose one from the internal spinners that you like, you can also customize it with a [named slot](#spinner-2) that called `spinner`.

- See also: [Configure Load Messages](../guide/configure-load-msg.md)

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

The component will be reset if this property has changed, just like recreating a new component, usually used when the case has filter or tabs.

## Slots

::: warning
Vue.js [deprecated slot special attributes](https://vuejs.org/v2/api/#slot-deprecated) after v2.6.0, it is recommended to use the [v-slot directive](https://vuejs.org/v2/api/#v-slot).
:::

The contents for these slots can be configured via the [`v-slot` directives](https://vuejs.org/v2/api/#v-slot), also can be configure via the plugin API.

- See also:
  - [Configure Load Messages](../guide/configure-load-msg.md)
  - [Configure Plugin Options - Slots](../guide/configure-plugin-opts.md#slots)

### no-results

- Default: `No results :(`
- Details: 

This message will be displayed if there is no data, it means we did not call the `$state.loaded` method before calling the `$stat.complete` method.

### no-more

- Default: `No more data :)`
- Details: 

This message will be displayed if there is no more data, it means we called the `$state.loaded` method before calling the `$state.complete` method.

### error

- Default: `Opps, something went wrong :( <br> <button>Retry</button>`
- Details: 

This message will be displayed if loading failed, it means we called the `$state.error` method.

### spinner

- Default: `Internal Spinner`
- Details: 

This slot will be displayed when loading data, you can customize your own spinner through it.

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

Inform the component that this loading failed, the content of `error` slot will be displayed.

#### $state.reset

Reset the component, same as changing the `identifier` property.

## Options

You can configure all these plugin options via the plugin API.

- See also: [Configure Plugin Options](../guide/configure-plugin-opts.md)

### props.spinner

- Type: `String`
- Details:

Configure the default value for `spinner` property.

- See also: [Properties - spinner](#spinner)

### props.distance

- Type: `Number`
- Details:

Configure the default value for  `distance` property.

::: warning
This option is read with a lower priority than [Options - slots.spinner](#slots-spinner), it means if you configure `slots.spinner` correctly, this option will never take effect
:::

- See also: [Properties - distance](#distance)

### props.forceUseInfiniteWrapper

- Type: `Boolean` | `String`
- Details:

Configure the default value for `forceUseInfiniteWrapper` property.

- See also: [Properties -  forceUseInfiniteWrapper](#forceuseinfinitewrapper)

### slots.noResults

- Type: `String` | `Vue Component`
- Details:

Configure the default content for `no-results` slot.

- See also: [Slots - no-results](#no-results)

### slots.noMore

- Type: `String` | `Vue Component`
- Details:

Configure the default content for `no-more` slot.

- See also: [Slots - no-more](#no-more)

### slots.error

- Type: `String` | `Vue Component`
- Details:

Configure the default content for `error` slot.

- See also: [Slots - error](#error)

### slots.errorBtnText

- Type: `String`
- Default: `Retry`
- Details:

Configure the default text for retry button in the default `error` slot. Please note, it won't work if you customize the `error` slot, you need to configure retry button yourself.

- See also:
  - [Slots - error](#error)
  - [Configure Load Messages](../guide/configure-load-msg.md)

### slots.spinner

- Type: `String` | `Vue Component`
- Details:

Configure the default content for `spinner` slot.

- See also: [Slots - spinner](#spinner-2)

### system.throttleLimit

- Type: `Number`
- Default: `50`
- Details:

Configure the default throttle space of time for `scroll` event (unit: ms).
