---
previewLink: //jsfiddle.net/PeachScript/qac2h5v1/embedded/result/
---

# Top Direction Scroll

Okay, it's time to try the top direction scroll list. This plugin will save and restore the scroll height automatically since `v2.4.0`, which means that the top direction feature can be used out of the box now!

``` html {5}
<header>
  <!-- Hacker News header -->
</header>

<infinite-loading direction="top" @infinite="infiniteHandler"></infinite-loading>

<div v-for="(item, $index) in list" :key="$index">
  <!-- Hacker News item loop -->
</div>
```

In the template, we moved the `InfiniteLoading` component to the top of the news list, and set the `direction` property to `top`.

``` js {21}
import axios from 'axios';

const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';

export default {
  data() {
    return {
      page: 1,
      list: [],
    };
  },
  methods: {
    infiniteHandler($state) {
      axios.get(api, {
        params: {
          page: this.page,
        },
      }).then(({ data }) => {
        if (data.hits.length) {
          this.page += 1;
          this.list.unshift(...data.hits.reverse());
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
};
```

The script part is almost the same as the [basic Hacker News](./start-with-hn.md). The only difference is that we reverse the news data from the server and unshift it into the `list`. That's it! This plugin will do the remaining work, isn't it very easy?
