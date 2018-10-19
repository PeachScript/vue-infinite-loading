/* eslint-disable no-console */

import config, { ERRORS } from './config';

/**
 * console warning in production
 * @param {String} msg console content
 */
export function warn(msg) {
  /* istanbul ignore else */
  if (config.mode !== 'production') {
    console.warn(`[Vue-infinite-loading warn]: ${msg}`);
  }
}

/**
 * console error
 * @param {String} msg console content
 */
export function error(msg) {
  console.error(`[Vue-infinite-loading error]: ${msg}`);
}

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
      error(ERRORS.INFINITE_LOOP);
      this.isChecked = true;
    }
  },
};

/**
 * determine slot is or not a empty element
 * @param   {Slot}    slot  target slot
 * @return  {Boolean}
 */
export function isBlankSlotElm(slot) {
  return (
    slot
    && slot[0].elm
    && slot[0].elm.textContent === ''
    && slot[0].elm.childNodes.length === 0
  );
}

export default {
  warn,
  error,
  throttleer,
  loopTracker,
  isBlankSlotElm,
};
