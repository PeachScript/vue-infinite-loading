/* eslint-disable no-console */

import config from './config';

export const throttleer = {
  caches: [],
  throttle(fn) {
    if (this.caches.indexOf(fn) === -1) {
      this.caches.push(fn);
      setTimeout(() => {
        fn();
        this.caches.splice(this.caches.indexOf(fn), 1);
      }, config.system.throttleLimit);
    }
  },
  reset() {
    this.caches = [];
  },
};

export default {
  throttleer,
};
