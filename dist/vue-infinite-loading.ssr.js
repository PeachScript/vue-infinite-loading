'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

var tinyEmitter = E;
var TinyEmitter = E;
tinyEmitter.TinyEmitter = TinyEmitter;var instance = new tinyEmitter();

var emitter = instance;var eventHub = {
  $on: function $on() {
    return emitter.on.apply(emitter, arguments);
  },
  $once: function $once() {
    return emitter.once.apply(emitter, arguments);
  },
  $off: function $off() {
    return emitter.off.apply(emitter, arguments);
  },
  $emit: function $emit() {
    return emitter.emit.apply(emitter, arguments);
  }
};var SPINNERS = ['bubbles', 'circles', 'spiral', 'wavedots'];
var script$1 = /* #__PURE__ */vue.defineComponent({
  name: 'Spinner',
  props: ['spinner'],
  computed: {
    spinnerView: function spinnerView() {
      return !SPINNERS.includes(this.spinner) ? 'default' : this.spinner;
    }
  }
});vue.pushScopeId("data-v-18ae5a62");

var _hoisted_1$1 = {
  key: 0,
  class: "loading-default"
};
var _hoisted_2$1 = {
  key: 1,
  class: "loading-bubbles"
};
var _hoisted_3$1 = {
  key: 2,
  class: "loading-circles"
};
var _hoisted_4 = {
  key: 3,
  class: "loading-spiral"
};
var _hoisted_5 = {
  key: 4,
  class: "loading-wave-dots"
};

vue.popScopeId();

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.spinnerView === 'default' ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_1$1)) : _ctx.spinnerView === 'bubbles' ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$1, [(vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(8, function (x) {
    return vue.createElementVNode("span", {
      class: "bubble-item",
      key: x
    });
  }), 64))])) : _ctx.spinnerView === 'circles' ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$1, [(vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(8, function (x) {
    return vue.createElementVNode("span", {
      class: "circle-item",
      key: x
    });
  }), 64))])) : _ctx.spinnerView === 'spiral' ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_4)) : _ctx.spinnerView === 'wavedots' ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, [(vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(5, function (x) {
    return vue.createElementVNode("span", {
      class: "wave-item",
      key: x
    });
  }), 64))])) : vue.createCommentVNode("", true);
}function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z$1 = ".loading-wave-dots[data-v-18ae5a62] {\n  position: relative;\n}\n.loading-wave-dots[data-v-18ae5a62] .wave-item {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: inline-block;\n  margin-top: -8px/2;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  animation: loading-wave-dots-18ae5a62 linear 2.8s infinite;\n}\n.loading-wave-dots[data-v-18ae5a62] .wave-item:first-child {\n  margin-left: -8px/2 + -32px;\n}\n.loading-wave-dots[data-v-18ae5a62] .wave-item:nth-child(2) {\n  margin-left: -8px/2 + -16px;\n  animation-delay: 0.14s;\n}\n.loading-wave-dots[data-v-18ae5a62] .wave-item:nth-child(3) {\n  margin-left: -8px/2;\n  animation-delay: 0.28s;\n}\n.loading-wave-dots[data-v-18ae5a62] .wave-item:nth-child(4) {\n  margin-left: -8px/2 + 16px;\n  animation-delay: 0.42s;\n}\n.loading-wave-dots[data-v-18ae5a62] .wave-item:last-child {\n  margin-left: -8px/2 + 32px;\n  animation-delay: 0.56s;\n}\n@keyframes loading-wave-dots-18ae5a62 {\n0% {\n    transform: translateY(0);\n    background: #bbb;\n}\n10% {\n    transform: translateY(-6px);\n    background: #999;\n}\n20% {\n    transform: translateY(0);\n    background: #bbb;\n}\n100% {\n    transform: translateY(0);\n    background: #bbb;\n}\n}\n.loading-circles[data-v-18ae5a62] .circle-item {\n  width: 5px;\n  height: 5px;\n  animation: loading-circles-18ae5a62 linear 0.75s infinite;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:first-child {\n  margin-top: -5px/2 + -12px;\n  margin-left: -5px/2;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(2) {\n  margin-top: -5px/2 + -8.76px;\n  margin-left: -5px/2 + 8.76px;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(3) {\n  margin-top: -5px/2;\n  margin-left: -5px/2 + 12px;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(4) {\n  margin-top: -5px/2 + 8.76px;\n  margin-left: -5px/2 + 8.76px;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(5) {\n  margin-top: -5px/2 + 12px;\n  margin-left: -5px/2;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(6) {\n  margin-top: -5px/2 + 8.76px;\n  margin-left: -5px/2 + -8.76px;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(7) {\n  margin-top: -5px/2;\n  margin-left: -5px/2 + -12px;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:last-child {\n  margin-top: -5px/2 + -8.76px;\n  margin-left: -5px/2 + -8.76px;\n}\n@keyframes loading-circles-18ae5a62 {\n0% {\n    background: #dfdfdf;\n}\n90% {\n    background: #505050;\n}\n100% {\n    background: #dfdfdf;\n}\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item {\n  background: #666;\n  animation: loading-bubbles-18ae5a62 linear 0.75s infinite;\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item:first-child {\n  margin-top: -1px/2 + -12px;\n  margin-left: -1px/2;\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(2) {\n  margin-top: -1px/2 + -8.76px;\n  margin-left: -1px/2 + 8.76px;\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(3) {\n  margin-top: -1px/2;\n  margin-left: -1px/2 + 12px;\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(4) {\n  margin-top: -1px/2 + 8.76px;\n  margin-left: -1px/2 + 8.76px;\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(5) {\n  margin-top: -1px/2 + 12px;\n  margin-left: -1px/2;\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(6) {\n  margin-top: -1px/2 + 8.76px;\n  margin-left: -1px/2 + -8.76px;\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(7) {\n  margin-top: -1px/2;\n  margin-left: -1px/2 + -12px;\n}\n.loading-bubbles[data-v-18ae5a62] .bubble-item:last-child {\n  margin-top: -1px/2 + -8.76px;\n  margin-left: -1px/2 + -8.76px;\n}\n@keyframes loading-bubbles-18ae5a62 {\n0% {\n    width: 1px;\n    height: 1px;\n    box-shadow: 0 0 0 3px #666;\n}\n90% {\n    width: 1px;\n    height: 1px;\n    box-shadow: 0 0 0 0 #666;\n}\n100% {\n    width: 1px;\n    height: 1px;\n    box-shadow: 0 0 0 3px #666;\n}\n}\n.loading-default[data-v-18ae5a62] {\n  position: relative;\n  border: 1px solid #999;\n  animation: loading-rotating-18ae5a62 ease 1.5s infinite;\n}\n.loading-default[data-v-18ae5a62]:before {\n  content: '';\n  position: absolute;\n  display: block;\n  top: 0;\n  left: 50%;\n  margin-top: -6px/2;\n  margin-left: -6px/2;\n  width: 6px;\n  height: 6px;\n  background-color: #999;\n  border-radius: 50%;\n}\n.loading-spiral[data-v-18ae5a62] {\n  border: 2px solid #777;\n  border-right-color: transparent;\n  animation: loading-rotating-18ae5a62 linear 0.85s infinite;\n}\n@keyframes loading-rotating-18ae5a62 {\n0% {\n    transform: rotate(0);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n.loading-bubbles[data-v-18ae5a62],\n.loading-circles[data-v-18ae5a62] {\n  position: relative;\n}\n.loading-circles[data-v-18ae5a62] .circle-item,\n.loading-bubbles[data-v-18ae5a62] .bubble-item {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: inline-block;\n  border-radius: 50%;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(2),\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(2) {\n  animation-delay: 0.093s;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(3),\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(3) {\n  animation-delay: 0.186s;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(4),\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(4) {\n  animation-delay: 0.279s;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(5),\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(5) {\n  animation-delay: 0.372s;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(6),\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(6) {\n  animation-delay: 0.465s;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:nth-child(7),\n.loading-bubbles[data-v-18ae5a62] .bubble-item:nth-child(7) {\n  animation-delay: 0.558s;\n}\n.loading-circles[data-v-18ae5a62] .circle-item:last-child,\n.loading-bubbles[data-v-18ae5a62] .bubble-item:last-child {\n  animation-delay: 0.651s;\n}\n";
styleInject(css_248z$1);script$1.render = render$1;
script$1.__scopeId = "data-v-18ae5a62";/*
 * default property values
 */
var props = {
  // the default spinner type
  spinner: 'default',
  // the default critical distance
  distance: 100,
  // the default force use infinite wrapper flag
  forceUseInfiniteWrapper: false
};
/**
 * default system settings
 */

var system = {
  // the default throttle space of time
  throttleLimit: 50,
  // the timeout for check infinite loop, unit: ms
  loopCheckTimeout: 1000,
  // the max allowed number of continuous calls, unit: ms
  loopCheckMaxCalls: 10
};
/**
 * default slot messages
 */

var slots = {
  noResults: 'No results :(',
  noMore: 'No more data :)',
  error: 'Opps, something went wrong :(',
  errorBtnText: 'Retry',
  spinner: ''
};
/**
 * the 3rd argument for event bundler
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */

var evt3rdArg = function () {
  var result = false;

  try {
    var arg = Object.defineProperty({}, 'passive', {
      get: function get() {
        result = {
          passive: true
        };
        return true;
      }
    });
    window.addEventListener('testpassive', arg, arg);
    window.remove('testpassive', arg, arg);
  } catch (e) {
    /* */
  }

  return result;
}();
/**
 * warning messages
 */

var WARNINGS = {
  INFINITE_EVENT: '`:on-infinite` property will be deprecated soon, please use `@infinite` event instead.'
};
/**
 * error messages
 */

var ERRORS = {
  INFINITE_LOOP: ["executed the callback function more than ".concat(system.loopCheckMaxCalls, " times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:"), "\n<!-- add a special attribute for the real scroll wrapper -->\n<div infinite-wrapper>\n  ...\n  <!-- set force-use-infinite-wrapper -->\n  <infinite-loading force-use-infinite-wrapper></infinite-loading>\n</div>\nor\n<div class=\"infinite-wrapper\">\n  ...\n  <!-- set force-use-infinite-wrapper as css selector of the real scroll wrapper -->\n  <infinite-loading force-use-infinite-wrapper=\".infinite-wrapper\"></infinite-loading>\n</div>\n    ", 'more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169'].join('\n')
};
/**
 * plugin status constants
 */

var STATUS = {
  READY: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: 3
};
/**
 * default slot styles
 */

var SLOT_STYLES = {
  color: '#666',
  fontSize: '14px',
  padding: '10px 0'
};
var config = {
  mode: 'development',
  props: props,
  system: system,
  slots: slots,
  WARNINGS: WARNINGS,
  ERRORS: ERRORS,
  STATUS: STATUS
};/* eslint-disable no-console */
/**
 * console warning in production
 * @param {String} msg console content
 */

function warn(msg) {
  /* istanbul ignore else */
  {
    console.warn("[Vue-infinite-loading warn]: ".concat(msg));
  }
}
/**
 * console error
 * @param {String} msg console content
 */

function error(msg) {
  console.error("[Vue-infinite-loading error]: ".concat(msg));
}
var throttleer = {
  timers: [],
  caches: [],
  throttle: function throttle(fn) {
    var _this = this;

    if (this.caches.indexOf(fn) === -1) {
      // cache current handler
      this.caches.push(fn); // save timer for current handler

      this.timers.push(setTimeout(function () {
        fn(); // empty cache and timer

        _this.caches.splice(_this.caches.indexOf(fn), 1);

        _this.timers.shift();
      }, config.system.throttleLimit));
    }
  },
  reset: function reset() {
    // reset all timers
    this.timers.forEach(function (timer) {
      clearTimeout(timer);
    });
    this.timers.length = 0; // empty caches

    this.caches = [];
  }
};
var loopTracker = {
  isChecked: false,
  timer: null,
  times: 0,
  track: function track() {
    var _this2 = this;

    // record track times
    this.times += 1; // try to mark check status

    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      _this2.isChecked = true;
    }, config.system.loopCheckTimeout); // throw warning if the times of continuous calls large than the maximum times

    if (this.times > config.system.loopCheckMaxCalls) {
      error(ERRORS.INFINITE_LOOP);
      this.isChecked = true;
    }
  }
};
var scrollBarStorage = {
  key: '_infiniteScrollHeight',
  getScrollElm: function getScrollElm(elm) {
    return elm === window ? document.documentElement : elm;
  },
  save: function save(elm) {
    var target = this.getScrollElm(elm); // save scroll height on the scroll parent

    target[this.key] = target.scrollHeight;
  },
  restore: function restore(elm) {
    var target = this.getScrollElm(elm);
    /* istanbul ignore else */

    if (typeof target[this.key] === 'number') {
      target.scrollTop = target.scrollHeight - target[this.key] + target.scrollTop;
    }

    this.remove(target);
  },
  remove: function remove(elm) {
    if (elm[this.key] !== undefined) {
      // remove scroll height
      delete elm[this.key]; // eslint-disable-line no-param-reassign
    }
  }
};
/**
 * kebab-case a camel-case string
 * @param   {String}    str  source string
 * @return  {String}
 */

function kebabCase(str) {
  return str.replace(/[A-Z]/g, function (s) {
    return "-".concat(s.toLowerCase());
  });
}
/**
 * get visibility for element
 * @param   {DOM}     elm
 * @return  {Boolean}
 */

function isVisible(elm) {
  return elm.offsetWidth + elm.offsetHeight > 0;
}var script = /* #__PURE__ */vue.defineComponent({
  name: 'InfiniteLoading',
  data: function data() {
    return {
      scrollParent: null,
      scrollHandler: null,
      isFirstLoad: true,
      // save the current loading whether it is the first loading
      status: STATUS.READY,
      slots: config.slots
    };
  },
  components: {
    Spinner: script$1
  },
  emits: ['infinite', '$InfiniteLoading:loaded', '$InfiniteLoading:complete', '$InfiniteLoading:reset'],
  computed: {
    isShowSpinner: function isShowSpinner() {
      return this.status === STATUS.LOADING;
    },
    isShowError: function isShowError() {
      return this.status === STATUS.ERROR;
    },
    isShowNoResults: function isShowNoResults() {
      return this.status === STATUS.COMPLETE && this.isFirstLoad;
    },
    isShowNoMore: function isShowNoMore() {
      return this.status === STATUS.COMPLETE && !this.isFirstLoad;
    },
    slotStyles: function slotStyles() {
      var _this = this;

      var styles = {};
      Object.keys(config.slots).forEach(function (key) {
        var name = kebabCase(key);

        if ( // no slot and the configured default slot is not a Vue component
        !_this.$slots[name] && !config.slots[key].render || _this.$slots[name] && _this.$slots[name]()[0].type === vue.Text) {
          // only apply default styles for pure text slot
          styles[key] = SLOT_STYLES;
        }
      });
      return styles;
    }
  },
  props: {
    distance: {
      type: Number,
      default: config.props.distance
    },
    spinner: String,
    direction: {
      type: String,
      default: 'bottom'
    },
    forceUseInfiniteWrapper: {
      type: [Boolean, String],
      default: config.props.forceUseInfiniteWrapper
    },
    identifier: {
      default: +new Date()
    }
  },
  watch: {
    identifier: function identifier() {
      this.stateChanger.reset();
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$watch('forceUseInfiniteWrapper', function () {
      _this2.scrollParent = _this2.getScrollParent();
    }, {
      immediate: true
    });

    this.scrollHandler = function (ev) {
      if (_this2.status === STATUS.READY) {
        if (ev && ev.constructor === Event && isVisible(_this2.$el)) {
          throttleer.throttle(_this2.attemptLoad);
        } else {
          _this2.attemptLoad();
        }
      }
    };

    setTimeout(function () {
      _this2.scrollHandler();

      _this2.scrollParent.addEventListener('scroll', _this2.scrollHandler, evt3rdArg);
    }, 1);
    eventHub.$on('$InfiniteLoading:loaded', function () {
      _this2.isFirstLoad = false;

      if (_this2.direction === 'top') {
        // wait for DOM updated
        _this2.$nextTick(function () {
          scrollBarStorage.restore(_this2.scrollParent);
        });
      }

      if (_this2.status === STATUS.LOADING) {
        _this2.$nextTick(_this2.attemptLoad.bind(null, true));
      }
    });
    eventHub.$on('$InfiniteLoading:complete', function () {
      _this2.status = STATUS.COMPLETE; // force re-complation computed properties to fix the problem of get slot text delay

      _this2.$nextTick(function () {
        _this2.$forceUpdate();
      });

      _this2.scrollParent.removeEventListener('scroll', _this2.scrollHandler, evt3rdArg);
    });
    eventHub.$on('$InfiniteLoading:reset', function () {
      _this2.status = STATUS.READY;
      _this2.isFirstLoad = true;
      scrollBarStorage.remove(_this2.scrollParent);

      _this2.scrollParent.addEventListener('scroll', _this2.scrollHandler, evt3rdArg); // wait for list to be empty and the empty action may trigger a scroll event


      setTimeout(function () {
        throttleer.reset();

        _this2.scrollHandler();
      }, 1);
    });
    /**
     * change state for this component, pass to the callback
     */

    this.stateChanger = {
      loaded: function loaded() {
        _this2.$emit('$InfiniteLoading:loaded', {
          target: _this2
        });

        eventHub.$emit('$InfiniteLoading:loaded', {
          target: _this2
        });
      },
      complete: function complete() {
        _this2.$emit('$InfiniteLoading:complete', {
          target: _this2
        });

        eventHub.$emit('$InfiniteLoading:complete', {
          target: _this2
        });
      },
      reset: function reset() {
        _this2.$emit('$InfiniteLoading:reset', {
          target: _this2
        });

        eventHub.$emit('$InfiniteLoading:reset', {
          target: _this2
        });
      },
      error: function error() {
        _this2.status = STATUS.ERROR;
        throttleer.reset();
      }
    };

    if (this.onInfinite) {
      warn(WARNINGS.INFINITE_EVENT);
    }
  },

  /**
   * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
   */
  deactivated: function deactivated() {
    /* istanbul ignore else */
    if (this.status === STATUS.LOADING) {
      this.status = STATUS.READY;
    }

    this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);
  },
  activated: function activated() {
    this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);
  },
  methods: {
    /**
     * attempt trigger load
     * @param {Boolean} isContinuousCall  the flag of continuous call, it will be true
     *                                    if this method be called in the `loaded`
     *                                    event handler
     */
    attemptLoad: function attemptLoad(isContinuousCall) {
      var _this3 = this;

      if (this.status !== STATUS.COMPLETE && isVisible(this.$el) && this.getCurrentDistance() <= this.distance) {
        this.status = STATUS.LOADING;

        if (this.direction === 'top') {
          // wait for spinner display
          this.$nextTick(function () {
            scrollBarStorage.save(_this3.scrollParent);
          });
        }

        if (typeof this.onInfinite === 'function') {
          this.onInfinite.call(null, this.stateChanger);
        } else {
          this.$emit('infinite', this.stateChanger);
        }

        if (isContinuousCall && !this.forceUseInfiniteWrapper && !loopTracker.isChecked) {
          // check this component whether be in an infinite loop if it is not checked
          // more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169
          loopTracker.track();
        }
      } else if (this.status === STATUS.LOADING) {
        this.status = STATUS.READY;
      }
    },

    /**
     * get current distance from the specified direction
     * @return {Number}     distance
     */
    getCurrentDistance: function getCurrentDistance() {
      var distance;

      if (this.direction === 'top') {
        distance = typeof this.scrollParent.scrollTop === 'number' ? this.scrollParent.scrollTop : this.scrollParent.pageYOffset;
      } else {
        var infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect().top;
        var scrollElmOffsetTopFromBottom = this.scrollParent === window ? window.innerHeight : this.scrollParent.getBoundingClientRect().bottom;
        distance = infiniteElmOffsetTopFromBottom - scrollElmOffsetTopFromBottom;
      }

      return distance;
    },

    /**
     * get the first scroll parent of an element
     * @param  {DOM} elm    cache element for recursive search
     * @return {DOM}        the first scroll parent
     */
    getScrollParent: function getScrollParent() {
      var elm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var result;

      if (typeof this.forceUseInfiniteWrapper === 'string') {
        result = document.querySelector(this.forceUseInfiniteWrapper);
      }

      if (!result) {
        if (elm.tagName === 'BODY') {
          result = window;
        } else if (!this.forceUseInfiniteWrapper && ['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
          result = elm;
        } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
          result = elm;
        }
      }

      return result || this.getScrollParent(elm.parentNode);
    }
  },
  unmounted: function unmounted() {
    /* istanbul ignore else */
    if (!this.status !== STATUS.COMPLETE) {
      throttleer.reset();
      scrollBarStorage.remove(this.scrollParent);
      this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);
    }
  }
});vue.pushScopeId("data-v-ce57e962");

var _hoisted_1 = {
  class: "infinite-loading-container"
};

var _hoisted_2 = /*#__PURE__*/vue.createElementVNode("br", null, null, -1);

var _hoisted_3 = ["textContent"];

vue.popScopeId();

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_spinner = vue.resolveComponent("spinner");

  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.withDirectives(vue.createElementVNode("div", {
    class: "infinite-status-prompt",
    style: vue.normalizeStyle(_ctx.slotStyles.spinner)
  }, [vue.renderSlot(_ctx.$slots, "spinner", vue.normalizeProps(vue.guardReactiveProps({
    isFirstLoad: _ctx.isFirstLoad
  })), function () {
    return [vue.createVNode(_component_spinner, {
      spinner: _ctx.spinner
    }, null, 8, ["spinner"])];
  })], 4), [[vue.vShow, _ctx.isShowSpinner]]), vue.withDirectives(vue.createElementVNode("div", {
    class: "infinite-status-prompt",
    style: vue.normalizeStyle(_ctx.slotStyles.noResults)
  }, [vue.renderSlot(_ctx.$slots, "no-results", {}, function () {
    return [_ctx.slots.noResults.render ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.slots.noResults), {
      key: 0
    })) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 1
    }, [vue.createTextVNode(vue.toDisplayString(_ctx.slots.noResults), 1)], 64))];
  })], 4), [[vue.vShow, _ctx.isShowNoResults]]), vue.withDirectives(vue.createElementVNode("div", {
    class: "infinite-status-prompt",
    style: vue.normalizeStyle(_ctx.slotStyles.noMore)
  }, [vue.renderSlot(_ctx.$slots, "no-more", {}, function () {
    return [_ctx.slots.noMore.render ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.slots.noMore), {
      key: 0
    })) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 1
    }, [vue.createTextVNode(vue.toDisplayString(_ctx.slots.noMore), 1)], 64))];
  })], 4), [[vue.vShow, _ctx.isShowNoMore]]), vue.withDirectives(vue.createElementVNode("div", {
    class: "infinite-status-prompt",
    style: vue.normalizeStyle(_ctx.slotStyles.error)
  }, [vue.renderSlot(_ctx.$slots, "error", {
    trigger: _ctx.attemptLoad
  }, function () {
    return [_ctx.slots.error.render ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.slots.error), {
      key: 0,
      trigger: _ctx.attemptLoad
    }, null, 8, ["trigger"])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 1
    }, [vue.createTextVNode(vue.toDisplayString(_ctx.slots.error) + " ", 1), _hoisted_2, vue.createElementVNode("button", {
      class: "btn-try-infinite",
      onClick: _cache[0] || (_cache[0] = function () {
        return _ctx.attemptLoad && _ctx.attemptLoad.apply(_ctx, arguments);
      }),
      textContent: vue.toDisplayString(_ctx.slots.errorBtnText)
    }, null, 8, _hoisted_3)], 64))];
  })], 4), [[vue.vShow, _ctx.isShowError]])]);
}var css_248z = ".infinite-loading-container[data-v-ce57e962] {\n  clear: both;\n  text-align: center;\n}\n.infinite-loading-container[data-v-ce57e962] *[class^=loading-] {\n  display: inline-block;\n  margin: 5px 0;\n  width: 28px;\n  height: 28px;\n  font-size: 28px;\n  line-height: 28px;\n  border-radius: 50%;\n}\n.btn-try-infinite[data-v-ce57e962] {\n  margin-top: 5px;\n  padding: 5px 10px;\n  color: #999;\n  font-size: 14px;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n  outline: none;\n  cursor: pointer;\n}\n.btn-try-infinite[data-v-ce57e962]:not(:active):hover {\n  opacity: 0.8;\n}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-ce57e962";// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /* #__PURE__ */(function () {
  // Get component instance
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('VueInfiniteLoading', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;