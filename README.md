# vue-infinite-loading
An infinite loading/scroll plugin for Vue.js

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

### Others
The `InfiniteLoading` component will add to global `Vue` automatically, so you just need import it into your APP like this way:
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
  <infinite-loading :distance="distance" :on-infinite="onInfinite" v-if="loadedAllData"></infinite-loading>
</body>
```
### Props

#### distance
The distance from the footer of scroll parent that trigger loading function.(Unit: px)
```
- type      Number
- required  false
- default   100
```

#### on-infinite
The loading function.

Most of the time, you should broadcast `$InfiniteLoading:loaded` event in the loading function after request data completely, if not, the loading animation won't stop and the `InfiniteLoading` component can't continue to request loading function.
```
- type      Function
- required  false
```

## Development Setup
```bash
# install dependencies
npm install

# run dev-server
npm run dev
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
