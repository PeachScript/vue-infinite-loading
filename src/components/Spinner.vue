<template>
  <component :is="spinnerView"></component>
</template>
<script>
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
        })),
        );
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
        })),
        );
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
        })),
        );
      },
    },
  };
  export default {
    name: 'spinner',
    computed: {
      spinnerView() {
        return SPINNERS[(this.spinner || '').toUpperCase()] || SPINNERS.DEFAULT;
      },
    },
    props: {
      spinner: String,
    },
  };
</script>
<style lang="less" scoped>
  @import '../styles/spinner';
</style>
