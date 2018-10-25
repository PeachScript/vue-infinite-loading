---
previewLink: //jsfiddle.net/PeachScript/a4Lxbf9w/embedded/result/
---

# Start With Hacker News

As the first step in learning this plugin, we will create a infinite scroll version of the [Hacker News](https://news.ycombinator.com/).

Firstly, we need to write template, it similar to this (ommited unimportant code):

``` html {9}
<header>
  <!-- Hacker News header -->
</header>

<div v-for="(item, $index) in list" :key="$index">
  <!-- Hacker News item loop -->
</div>

<infinite-loading @infinite="infiniteHandler"></infinite-loading>
```

In the template, we put the `InfiniteLoading` component at the bottom of news list, and listen it's `infinite` event by a method called `infiniteHandler`.

Then write the core logic, `infiniteHandler` method:

``` js
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
          this.list.push(...data.hits);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
};
```

In the script, we use [HN Search API](https://hn.algolia.com/api) and [axios](https://github.com/mzabriskie/axios) to fetch news data. If the server API returns an array with news data, we will push them into `list`, record current page, and tell this plugin through `$state.loaded` method that we got some data. If the server API returns an empty array, we will tell this plugin through `$state.complete` method that all data has been loaded.

Now, you can get an infinite scroll version of Hacker News, just like the preview on the right.
