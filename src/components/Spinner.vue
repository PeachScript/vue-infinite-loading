<template>
  <component :is="spinnerView"></component>
</template>

<script>
import config from '../config';

const SPINNERS = {
  BUBBLES: {
    render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-bubbles',
        },
      }, Array.apply(Array, Array(8)).map(() => createElement('span', {
        attrs: {
          class: 'bubble-item',
        },
      })));
    },
  },
  CIRCLES: {
    render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-circles',
        },
      }, Array.apply(Array, Array(8)).map(() => createElement('span', {
        attrs: {
          class: 'circle-item',
        },
      })));
    },
  },
  DEFAULT: {
    render(createElement) {
      return createElement('i', {
        attrs: {
          class: 'loading-default',
        },
      });
    },
  },
  SPIRAL: {
    render(createElement) {
      return createElement('i', {
        attrs: {
          class: 'loading-spiral',
        },
      });
    },
  },
  WAVEDOTS: {
    render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-wave-dots',
        },
      }, Array.apply(Array, Array(5)).map(() => createElement('span', {
        attrs: {
          class: 'wave-item',
        },
      })));
    },
  },
};

export default {
  name: 'Spinner',
  computed: {
    spinnerView() {
      const spinner = this.$attrs.spinner || config.props.spinner;

      return (
        typeof spinner === 'string'
          ? (SPINNERS[spinner.toUpperCase()] || SPINNERS.DEFAULT)
          : spinner
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import '../styles/spinner';
</style>
