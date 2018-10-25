---
previewLink: //jsfiddle.net/PeachScript/qac2h5v1/embedded/result/
---

# 向上进行无限滚动

现在是时候尝试完成一个方向朝上的无限滚动列表了，从 `v2.4.0` 版本开始，此插件将会自动保存和复原滚动条的高度，这意味着向上无限滚动的功能现在可以开箱即用！

``` html {5}
<header>
  <!-- Hacker News header -->
</header>

<infinite-loading direction="top" @infinite="infiniteHandler"></infinite-loading>

<div v-for="(item, $index) in list" :key="$index">
  <!-- Hacker News item loop -->
</div>
```

在模板中，我们将 `InfiniteLoading` 组件移动到了新闻列表的上方，并且设置 `direction` 属性值为 `top`。

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

逻辑部分跟 [基础 Hacker News](./start-with-hn.md) 几乎一致，不同的地方在于，我们将拿到的新闻数据进行了反转然后插入到了列表的最前面。这样就可以了，剩下的事插件将会替我们完成，是不是很简单？
