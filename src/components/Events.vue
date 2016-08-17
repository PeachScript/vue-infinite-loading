<template>
  <h3>Events</h3>
  <p>The <code>infiniteLoading</code> component will handle the following events if you <code>$broadcast</code>, <code>$emit</code> or <code>$dispatch</code> them.</p>
  <h4>$InfiniteLoading:loaded</h4>
  <p>Usually, you need to send this event after data loading, the <code>infiniteLoading</code> component will hide the loading animation and ready for the next triggering.</p>

  <h4>$InfiniteLoading:noResults</h4>
  <p>The <code>infiniteLoading</code> component will display a no result prompt for user, and you can customize prompt's content by <code>slot</code>.</p>

  <h4>$InfiniteLoading:noMore</h4>
  <p>The <code>infiniteLoading</code> component will display a no more prompt for user, and you can customize prompt's content by <code>slot</code>.</p>

  <h4>$InfiniteLoading:reset</h4>
  <p>The <code>infiniteLoading</code> component will back to the original state, and the <code>on-infinite</code> function will be called right now. Most of the time, this event is useful if you use this component with filter or tabs.</p>
</template>
