<template>
  <h3>Slots</h3>
  <p>You can customize the prompt's content by <code>slot</code>, you also can use the default content if you like it:</p>
  <pre>
&lt;span slot=&quot;{slot name}&quot;&gt;
  { Your content }
&lt;/span&gt;</pre>

  <h4>no-results</h4>
  <p>This content will be display when the <code>InfiniteLoading</code> component received <code>$InfiniteLoading:noResults</code> event.</p>
  <pre>
- type      String
- default   No results :(</pre>

  <h4>no-more</h4>
  <p>This content will be display when the <code>InfiniteLoading</code> component received <code>$InfiniteLoading:noMore</code> event.</p>
  <pre>
- type      String
- default   No more data :)</pre>
</template>
