/**
 * check display status for a specific element
 * @param  {DOM}      elm
 * @return {Boolean}
 */
export function isShow(elm) {
  return window.getComputedStyle(elm).display !== 'none';
}

/**
 * continues call the specified number of times for a function
 * @param  {Function} fn    target function
 * @param  {Number}   times calls
 * @param  {Function} cb    [description]
 */
export function continuesCall(fn, times, cb) {
  if (times) {
    fn();
    setTimeout(() => {
      continuesCall(fn, times - 1, cb);
    }, 1);
  } else {
    cb();
  }
}

let fakeCache;
/**
 * fake function or restore function
 * @param   {Function} fn     target function
 * @param   {Function} cb     fake function
 */
export function fakeBox(fn, cb) {
  let result;

  if (fakeCache) {
    result = fakeCache;
    fakeCache = null;
  } else {
    fakeCache = fn;
    result = (...args) => {
      cb(...args);
    };
  }

  return result;
}

export default {
  isShow,
  continuesCall,
  fakeBox,
};
