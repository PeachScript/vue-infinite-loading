---
previewLink: //jsfiddle.net/PeachScript/a4Lxbf9w/embedded/result/
---

# 从 Hacker News 开始

作为了解这款插件的第一步，我们将会创建一个无限滚动版的 [Hacker News](https://news.ycombinator.com/)。

首先，我们需要编写模板，内容大概如下（已省略不重要的代码）：

``` html {9}
<header>
  <!-- Hacker News header -->
</header>

<div v-for="(item, $index) in list" :key="$index">
  <!-- Hacker News item loop -->
</div>

<infinite-loading @infinite="infiniteHandler"></infinite-loading>
```

在模板中，我们将 `InfiniteLoading` 组件放在了新闻列表的最下方，并且使用一个叫做 `infiniteHandler` 的方法监听组件的 `infinite` 事件。

接下来编写核心逻辑—— `infiniteHandler` 方法：

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

在这段脚本中，我们使用 [HN Search API](https://hn.algolia.com/api) 和 [axios](https://github.com/mzabriskie/axios) 来获取新闻数据。如果服务端 API 返回了带新闻数据的数组，我们会将数据放入 `list`、会记录当前页码，并且通过 `$state.loaded` 方法通知插件我们已经拿到数据了；如果服务端 API 返回的是空数据，我们将会通过 `$state.complete` 方法通知插件所有数据都加载完了。

现在，你已经完成了一个无限滚动版本的 Hacker News， 就像右边的预览一样。
