<template>
  <h3>Events</h3>
  <p v-show="$parent.docVersion < 2">The <code>InfiniteLoading</code> component will handle the following events if you <code>$broadcast</code>, <code>$emit</code> or <code>$dispatch</code> them.</p>
  <p v-show="$parent.docVersion >= 2">The <code>InfiniteLoading</code> component will handle the following events if you <code>$emit</code> them by the instance of the component, you can get the instance of component by the <code><a v-link="{ name: 'properties' }">ref</a></code> property.</p>
  <h4>$InfiniteLoading:loaded</h4>
  <p>Usually, you need to send this event after data loading, the <code>InfiniteLoading</code> component will hide the loading animation and ready for the next triggering.</p>

  <div v-show="$parent.docVersion < 1">
    <h4>$InfiniteLoading:noResults</h4>
    <p>The <code>InfiniteLoading</code> component will display a no result prompt for user, and you can customize prompt's content by <a v-link="{ name: 'slots' }">slot</a>.</p>

    <h4>$InfiniteLoading:noMore</h4>
    <p>The <code>InfiniteLoading</code> component will display a no more prompt for user, and you can customize prompt's content by <a v-link="{ name: 'slots' }">slot</a>.</p>
  </div>

  <div v-show="$parent.docVersion >= 1">
    <h4>$InfiniteLoading:complete</h4>
    <p>If the <code>InfiniteLoading</code> component never recieved <code>$InfiniteLoading:loaded</code> when you send this event, it will display a no result prompt for user, if not, it will display a no more prompt for user, and you can customize their content by <a v-link="{ name: 'slots' }">slot</a>.</p>
    <p>Your <code>onInfinite</code> function maybe like this:</p>
    <pre v-highlightjs v-if="$parent.docVersion < 2">onInfinite() {
  this.$http.get(url, (res) =&gt; {
    if (res.data) {
      this.list = this.list.concat(res.data);
      this.$broadcast('$InfiniteLoading:loaded');
    } else {
      this.$broadcast('$InfiniteLoading:complete');
    }
  });
}</pre>
    <pre v-highlightjs v-if="$parent.docVersion >= 2">onInfinite() {
  this.$http.get(url, (res) =&gt; {
    if (res.data) {
      this.list = this.list.concat(res.data);
      this.$refs[your ref attirbute's value].$emit('$InfiniteLoading:loaded');
    } else {
      this.$refs[your ref attirbute's value].$emit('$InfiniteLoading:complete');
    }
  });
}</pre>
  </div>

  <h4>$InfiniteLoading:reset</h4>
  <p>The <code>InfiniteLoading</code> component will back to the original state, and the <code>on-infinite</code> function will be called immediately if the distance is expected. Most of the time, this event is useful if you use this component with filter or tabs.</p>
</template>
