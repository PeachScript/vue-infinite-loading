# Configure Plugin Options

We can configure default properties, default slots and default system settings for this plugin via the plugin API, which will then be the default values for all of the `InfiniteLoading` components in your project. You can still override them through properties or slots in every component.

## Props/Settings

Simply pass an object containing the `props`/`settings` field to configure them. To check out all available options, click [here](../api/#options).

``` js
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, {
  props: {
    spinner: 'default',
    /* other props need to configure */
  },
  system: {
    throttleLimit: 50,
    /* other settings need to configure */
  },
});
```

## Slots

Unlike properties and settings, slot options can be either a string or a `Vue Component`:

``` js
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import InfiniteError from 'path/to/your/components/InfiniteError';

Vue.use(InfiniteLoading, {
  slots: {
    noMore: 'No more message', // you can pass a string value
    error: InfiniteError, // you also can pass a Vue component as a slot
  },
});
