<template>
  <h3>Properties</h3>

  <h4>on-infinite</h4>
  <p>This is a callback function which will be called when scroll to the specific distance from the bottom of scroll parent.</p>
  <p>Usually, you should to send the <code>$InfiniteLoading:loaded</code> event in this function after loaded data completely.</p>
  <pre>
- type      Function
- required  false</pre>

  <h4>distance</h4>
  <p>This is a critical value for scroll. If the distance from the bottom of scroll parent less than this property, the <code>on-infinite</code> callback will be called.</p>
  <pre>
- type      Number
- required  false
- default   100
- unit      pixel</pre>

  <h4>v-if</h4>
  <p>As you know, this property is an official directive of Vue.js for render element conditionally, so we can render or destroy the <code>InfiniteLoading</code> component by it.</p>
  <pre>
- type      Boolean
- required  false</pre>

  <div v-show="$parent.docVersion >= 1">
    <h4>spinner</h4>
    <p>You can choose your favorite spinner as loading animation by this property, <a v-link="{ name: 'spinners' }">click here</a> to see all available spinners.</p>
    <pre>
- type      String
- required  false
- default   'default'</pre>
  </div>
</template>
