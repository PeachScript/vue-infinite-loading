# Configure Plugin Options

We can configure default properties, default slots and default system settings for this plugin via the plugin API, they will apply for all the `InfiniteLoading` components in your project.

## Props/Settings

Simply passing a object contains `props`/`settings` filed to configure them, to check out all available options, click [here](../api/#options).

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

Unlike properties and settings, slot option can be a string or a `Vue Component`:

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
