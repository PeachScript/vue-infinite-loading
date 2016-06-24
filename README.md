<p align="center"><img width="200" src="./doc/logo.png"></p>

# vue-infinite-loading
An infinite loading/scroll plugin for Vue.js

## Demos

### Picture demo

![Picture demo](./doc/demo.gif)

### Live demo

See [http://peachscript.github.io/vue-infinite-loading/](http://peachscript.github.io/vue-infinite-loading/)

## Install
```bash
npm install vue-infinite-loading --save
```

## Import

### ES6
```js
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading
  }
}
```

### CommonJS
```js
const InfiniteLoading = require('vue-infinite-loading');

export default {
  components: {
    InfiniteLoading
  }
}
```

### Others
The `InfiniteLoading` component will register with the global `Vue` automatically, so you just need import it into your APP like this way:
```html
<script src="/path/to/vue-infinite-loading/dist/vue-infinite-loading.js"></script>
```

## Usage
Template:
```html
<body>
  <ul>
    <li v-for="item in list" v-text="item"></li>
  </ul>
  <infinite-loading :distance="distance" :on-infinite="onInfinite" v-if="isLoadedAllData"></infinite-loading>
</body>
```
### Props

#### on-infinite
The callback use for scroll to specific distance from the bottom of scroll parent.

Most of the time, you should broadcast `$InfiniteLoading:loaded` event in this callback after loaded data completely, if not, the loading animation won't stop and the `InfiniteLoading` component no longer call this function.
```
- type      Function
- required  false
```

#### distance
The critical value for scroll. If the distance from the bottom of scroll parent less than this property, the `on-infinite` callback will be called .
```
- type      Number
- required  false
- default   100
- unit      pixel
```

#### v-if
As you know, this property is an official directive of `Vue.js` for render element conditionally, so we can render or destroy the `InfiniteLoading` component by it.
```
- type      Boolean
- required  false
```

### Events

#### $InfiniteLoading:loaded
When the `InfiniteLoading` component received this event, it will hide the loading animation and continue to wait the next trigger.

#### $InfiniteLoading:noResults
When the `InfiniteLoading` component received this event, it will display the no results tips.

#### $InfiniteLoading:noMore
When the `InfiniteLoading` component received this event, it will display the no more data tips.

#### $InfiniteLoading:reset
When the `InfiniteLoading` component received this event, it will reset itself, and the `on-infinite` function will be called. Maybe you need it when you use the component in some UI component like filter tabs.

### Slots

#### no-results
This content will display when the `InfiniteLoading` component received `$InfiniteLoading:noResults` event.
```
- type      String
- default   No results :(
```

#### no-more
This content will display when the `InfiniteLoading` component received `$InfiniteLoading:noMore` event.
```
- type      String
- default   No more data :)
```

## Development Setup
```bash
# install dependencies
npm install

# run dev-server
npm run dev

# test
npm test

# lint
npm lint
```

## Licence
The MIT License (MIT)

Copyright (c) 2016 PeachScript

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
