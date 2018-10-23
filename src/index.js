import config from './config';
import InfiniteLoading from './components/InfiniteLoading.vue';

function syncModeFromVue(Vue) {
  config.mode = Vue.config.productionTip ? 'development' : 'production';
}

Object.defineProperty(InfiniteLoading, 'install', {
  configurable: false,
  enumerable: false,
  value(Vue, options) {
    // override default props
    Object.assign(config.props, options && options.props);

    // override default slots
    Object.assign(config.slots, options && options.slots);

    // override default system settings
    Object.assign(config.system, options && options.system);

    // register component
    Vue.component('infinite-loading', InfiniteLoading);

    syncModeFromVue(Vue);
  },
});

// register component automatically if there has global Vue
/* istanbul ignore else */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('infinite-loading', InfiniteLoading);
  syncModeFromVue(window.Vue);
}

export default InfiniteLoading;
