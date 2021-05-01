<script>
import { defineComponent } from 'vue';
import InfiniteLoading from '@/components/InfiniteLoading.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    InfiniteLoading,
  }
});
</script>

<template>
  <div id="app">
    <InfiniteLoading />
  </div>
</template>
