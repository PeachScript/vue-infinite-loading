<template>
  <h3>Properties</h3>

  <div v-show="$parent.docVersion < 2.2">
    <h4>on-infinite</h4>
    <p>This is a callback function which will be called when scroll to the specific distance from the bottom of scroll parent.</p>
    <p>Usually, you should to send the <code>$InfiniteLoading:loaded</code> event in this function after loaded data completely.</p>
    <pre>
  - type      Function
  - required  true</pre>
  </div>

  <h4>distance</h4>
  <p>This is a critical value for scroll. If the distance from the bottom of scroll parent less than this property,
  <span v-show="$parent.docVersion < 2.2">the <code>on-infinite</code> callback will be called.</span>
  <span v-show="$parent.docVersion >= 2.2">the <code>infinite</code> event will be triggered.</span>
  </p>
  <pre>
- type      Number
- required  false
- default   100
- unit      pixel</pre>

  <div v-show="$parent.docVersion >= 1">
    <h4>spinner</h4>
    <p>You can choose your favorite spinner as loading animation by this property, <a v-link="{ name: 'spinners' }">click here</a> to see all available spinners.</p>
    <pre>
- type      String
- required  false
- default   'default'</pre>
  </div>

  <div v-show="$parent.docVersion >= 2">
    <h4>ref</h4>
    <p>As you know, this property is an official directive of Vue.js to get the instance of child component, we need get the instance of <code>InfiniteLoading</code> component to send event for it. You can get the instance by this way: <code>this.$refs[the value of ref attribute]</code>.</p>
    <pre>
- type      String
- required  true</pre>
  </div>

  <div v-show="$parent.docVersion >= 1.3 && $parent.docVersion < 2 || $parent.docVersion >= 2.01">
    <h4>direction</h4>
    <p>If you set this propery to <code>top</code>,
    <span v-show="$parent.docVersion < 2.2">this componet will call the <code>on-infinite</code> function</span>
    <span v-show="$parent.docVersion >= 2.2">this componet will triggere the <code>infinite</code> event</span>
    when you scroll to top.</p>
    <div class="warning-prompt">
      Warning: You must set the <code>scrollTop</code> of the scroll parent to correct value <strong>manually</strong> after load data, if not,
      <span v-show="$parent.docVersion < 2.2">this component will call the <code>on-infinite</code> function</span>
      <span v-show="$parent.docVersion >= 2.2">this component will triggere the <code>infinite</code> event</span>
      again and again.
    </div>
    <pre>
- type      String
- default   'bottom'</pre>
  </div>
</template>
