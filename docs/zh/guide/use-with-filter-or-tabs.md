---
previewLink: //jsfiddle.net/PeachScript/w197rfy0/embedded/result/
---

# 与过滤器和选项卡一起使用

加载数据的过程与上一个案例完全一致，关键在于当我们改变过滤器选项或者切换选项卡的时候应该如何重设组件。实际上，每当 `identifier` 属性发生变化的时候，该组件就会自行重设，所以一切看起来都很容易，我们开始吧！

``` html {12}
<header>
  <!-- Hacker News header -->
  <select v-model="newsType" @change="changeType">
    <!-- Type options -->
  </select>
</header>

<div v-for="(item, $index) in list" :key="$index">
  <!-- Hacker News item loop -->
</div>

<infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
```

在模板中，我们添加了一个 `select` 元素并监听它的 `change` 事件，我们还为 `InfiniteLoading` 组件添加了一个 `identifier` 属性。

``` js {10,11,19,31,32,33,34,35}
import axios from 'axios';

const api = '//hn.algolia.com/api/v1/search_by_date';

export default {
  data() {
    return {
      page: 1,
      list: [],
      newsType: 'story',
      infiniteId: +new Date(),
    };
  },
  methods: {
    infiniteHandler($state) {
      axios.get(api, {
        params: {
          page: this.page,
          tags: this.newsType,
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
    changeType() {
      this.page = 1;
      this.list = [];
      this.infiniteId += 1;
    },
  },
};
```

在这段脚本中，我们为 `select` 和 `identifier` 属性设定了默认值，然后在 API 请求逻辑中添加了类型参数。我们还创建了一个 `changeType` 方法用于重设列表数据和加载组件，请注意，我们必须**在清空列表之后**再改变 `identifier` 属性，否则组件将可能无法在重设之后立即触发 `infinite` 事件。

恭喜，你已经搞定了！
