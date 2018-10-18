/* eslint-disable no-console */

import config, { ERRORS } from './config';

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

export const loopTracker = {
  isChecked: false,
  timer: null,
  times: 0,
  track() {
    // record track times
    this.times += 1;

    // try to mark check status
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.isChecked = true;
    }, config.system.loopCheckTimeout);

    // throw warning if the times of continuous calls large than the maximum times
    if (this.times > config.system.loopCheckMaxCalls) {
      console.error(ERRORS.INFINITE_LOOP);
      this.isChecked = true;
    }
  },
};

export default {
  throttleer,
  loopTracker,
};
