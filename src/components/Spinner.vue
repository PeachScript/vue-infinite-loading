<template>
  <i class="loading-default" v-if="spinnerView === 'default'"></i>

  <span class="loading-bubbles" v-else-if="spinnerView === 'bubbles'">
    <span v-for="x in 8" class="bubble-item" :key="x"></span>
  </span>

  <span class="loading-circles" v-else-if="spinnerView === 'circles'">
    <span v-for="x in 8" class="circle-item" :key="x"></span>
  </span>

  <i class="loading-spiral" v-else-if="spinnerView === 'spiral'"></i>

  <span class="loading-wave-dots" v-else-if="spinnerView === 'wavedots'">
    <span v-for="x in 5" class="wave-item" :key="x"></span>
  </span>
</template>

<script>
import { defineComponent } from 'vue';

const SPINNERS = [
  'bubbles', 'circles', 'spiral', 'wavedots',
];

export default /* #__PURE__ */defineComponent({
  name: 'Spinner',
  props: ['spinner'],
  computed: {
    spinnerView() {
      return (
        SPINNERS[(this.spinner || '')]
        || 'default' // fallback to spinner of config
      );
    },
  },
});
</script>

<style lang="less" scoped>
@import '../styles/spinner';
</style>
