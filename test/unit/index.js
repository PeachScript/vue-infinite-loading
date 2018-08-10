// mock passive event listener support and upsupport
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

const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../../src', true, /^\/(?!index(\.js)?$)/);
srcContext.keys().forEach(srcContext);
