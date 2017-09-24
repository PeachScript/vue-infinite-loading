<template>
  <div v-show="$parent.docVersion >= 2.2">
    <h3>Triggered events</h3>
    <h4>infinite</h4>
    <p>The <code>InfiniteLoading</code> component will trigger this event when the distance that from top or bottom is less than the <code>distance</code> property.</p>
    <p>Before that, we need to listen this event on the <code>InfiniteLoading</code> component through <code>v-on:</code> or the shorthand <code>@</code>:</p>
    <pre v-highlightjs>&lt;infinite-loading @infinite=&quot;infiniteHandler&quot;&gt;&lt;/infinite-loading&gt;</pre>
    <p>You also can pass more arguments for the event handler:</p>
    <pre v-highlightjs>&lt;infinite-loading @infinite=&quot;infiniteHandler($event, arg1, arg2)&quot;&gt;&lt;/infinite-loading&gt;</pre>
    <p>And this component will pass a special event argument <code>$state</code> to the event handler to change the load state, the <code>$state</code> argument include three methods, they are the <code>loaded</code> method, the <code>complete</code> method and the <code>reset</code> method.</p>
    <p>The <code>loaded</code> method use to stop the laoding animation after each data load, then this component will ready for the next triggering.</p>
    <p>The <code>complete</code> method use to complete a full infinite load, then this component will no longer handle any scroll action. If the <code>loaded</code> method never be called when you call the <code>complete</code> method, this component will display the no results message for user, if not, it will display the no more message for user, and you can customize their content by <a v-link="{ name: 'slots' }">slot</a>.</p>
    <p>The <code>reset</code> method is the shortcut of the <code>reset</code> event in the bellow.</p>
    <pre v-highlightjs>infiniteHandler($state) {
  axios.get(url, ({ data }) =&gt; {
    if (data) {
      this.list = this.list.concat(data);
      $state.loaded();
    } else {
      $state.complete();
    }
  });
}</pre>
  </div>
  <h3 v-show="$parent.docVersion < 2.2">Events</h3>
  <h3 v-show="$parent.docVersion >= 2.2">Received events</h3>
  <p v-show="$parent.docVersion < 2">The <code>InfiniteLoading</code> component will handle the following events if you <code>$broadcast</code>, <code>$emit</code> or <code>$dispatch</code> them.</p>
  <p v-show="$parent.docVersion >= 2">The <code>InfiniteLoading</code> component will handle the following events if you <code>$emit</code> them by the instance of the component, you can get the instance of component by the <code><a v-link="{ name: 'properties' }">ref</a></code> property.</p>
  <div v-show="$parent.docVersion < 2.2">
    <h4>$InfiniteLoading:loaded</h4>
    <p>Usually, you need to send this event after data loading, the <code>InfiniteLoading</code> component will hide the loading animation and ready for the next triggering.</p>

    <div v-show="$parent.docVersion < 1">
      <h4>$InfiniteLoading:noResults</h4>
      <p>The <code>InfiniteLoading</code> component will display the no result message for user, and you can customize prompt's content by <a v-link="{ name: 'slots' }">slot</a>.</p>

      <h4>$InfiniteLoading:noMore</h4>
      <p>The <code>InfiniteLoading</code> component will display the no more message for user, and you can customize prompt's content by <a v-link="{ name: 'slots' }">slot</a>.</p>
    </div>

    <div v-show="$parent.docVersion >= 1">
      <h4>$InfiniteLoading:complete</h4>
      <p>If the <code>InfiniteLoading</code> component never recieved <code>$InfiniteLoading:loaded</code> when you send this event, it will display the no result message for user, if not, it will display the no more message for user, and you can customize their content by <a v-link="{ name: 'slots' }">slot</a>.</p>
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
  axios.get(url, ({ data }) =&gt; {
    if (data) {
      this.list = this.list.concat(data);
      this.$refs[your ref attirbute's value].$emit('$InfiniteLoading:loaded');
    } else {
      this.$refs[your ref attirbute's value].$emit('$InfiniteLoading:complete');
    }
  });
}</pre>
    </div>
  </div>

  <h4>$InfiniteLoading:reset</h4>
  <p>The <code>InfiniteLoading</code> component will back to the original state, and the
    <span v-show="$parent.docVersion < 2.2"><code>on-infinite</code> function will be called</span>
    <span><code>infinite</code> event will be triggered</span>
    immediately if the current distance that from bottom or top less than the <code>distance</code> property. Most of the time, this event is useful if you use this component with filter or tabs.</p>
</template>
