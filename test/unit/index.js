import Vue from 'vue/dist/vue.common';

// mock passive event listener support and not support
(() => {
  const originAddListener = window.addEventListener;
  let flag;

  window.addEventListener = (...args) => {
    // try to read passive property and only read once time if it is accessible
    if (!flag && args[2] && args[2].passive) {
      flag = false;
    }
    originAddListener.apply(window, args);
  };
})();

// disable Vue production tip
Vue.config.productionTip = false;

// setup global Vue manually
window.Vue = Vue;

const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../../src', true, /\.js$/);
srcContext.keys().forEach(srcContext);
