import { defineComponent, pushScopeId, popScopeId, openBlock, createBlock, Fragment, renderList, createVNode, createCommentVNode, withScopeId, resolveComponent, withDirectives, renderSlot, vShow, resolveDynamicComponent, createTextVNode, toDisplayString } from 'vue';

function E () {
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
tinyEmitter.TinyEmitter = TinyEmitter;

var instance = new tinyEmitter();

var eventHub = {
  $on: (...args) => instance.on(...args),
  $once: (...args) => instance.once(...args),
  $off: (...args) => instance.off(...args),
  $emit: (...args) => instance.emit(...args)
};

/*
 * default property values
 */
const props = {
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

const system = {
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

const slots = {
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

const evt3rdArg = (() => {
  let result = false;

  try {
    const arg = Object.defineProperty({}, 'passive', {
      get() {
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
})();
/**
 * warning messages
 */

const WARNINGS = {
  STATE_CHANGER: ['emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):', '\ntemplate:', '<infinite-loading @infinite="infiniteHandler"></infinite-loading>', `
script:
...
infiniteHandler($state) {
  ajax('https://www.example.com/api/news')
    .then((res) => {
      if (res.data.length) {
        $state.loaded();
      } else {
        $state.complete();
      }
    });
}
...`, '', 'more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549'].join('\n'),
  INFINITE_EVENT: '`:on-infinite` property will be deprecated soon, please use `@infinite` event instead.',
  IDENTIFIER: 'the `reset` event will be deprecated soon, please reset this component by change the `identifier` property.'
};
/**
 * error messages
 */

const ERRORS = {
  INFINITE_LOOP: [`executed the callback function more than ${system.loopCheckMaxCalls} times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:`, `
<!-- add a special attribute for the real scroll wrapper -->
<div infinite-wrapper>
  ...
  <!-- set force-use-infinite-wrapper -->
  <infinite-loading force-use-infinite-wrapper></infinite-loading>
</div>
or
<div class="infinite-wrapper">
  ...
  <!-- set force-use-infinite-wrapper as css selector of the real scroll wrapper -->
  <infinite-loading force-use-infinite-wrapper=".infinite-wrapper"></infinite-loading>
</div>
    `, 'more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169'].join('\n')
};
/**
 * plugin status constants
 */

const STATUS = {
  READY: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: 3
};
/**
 * default slot styles
 */

const SLOT_STYLES = {
  color: '#666',
  fontSize: '14px',
  padding: '10px 0'
};
var config = {
  mode: 'development',
  props,
  system,
  slots,
  WARNINGS,
  ERRORS,
  STATUS
};

const SPINNERS = ['bubbles', 'circles', 'spiral', 'wavedots'];
var script$1 = /*#__PURE__*/defineComponent({
  name: 'Spinner',
  props: ['spinner'],
  computed: {
    spinnerView() {
      return SPINNERS[this.spinner || ''] || 'default' // fallback to spinner of config
      ;
    }

  }
});

const _withId$1 = /*#__PURE__*/withScopeId("data-v-00c1427c");

pushScopeId("data-v-00c1427c");

const _hoisted_1$1 = {
  key: 0,
  class: "loading-default"
};
const _hoisted_2$1 = {
  key: 1,
  class: "loading-bubbles"
};
const _hoisted_3 = {
  class: "bubble-item"
};
const _hoisted_4 = {
  key: 2,
  class: "loading-circles"
};
const _hoisted_5 = {
  class: "circle-item"
};
const _hoisted_6 = {
  key: 3,
  class: "loading-spiral"
};
const _hoisted_7 = {
  key: 4,
  class: "loading-wave-dots"
};
const _hoisted_8 = {
  class: "wave-item"
};

popScopeId();

const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  return _ctx.spinnerView === 'default' ? (openBlock(), createBlock("i", _hoisted_1$1)) : _ctx.spinnerView === 'bubbles' ? (openBlock(), createBlock("span", _hoisted_2$1, [(openBlock(), createBlock(Fragment, null, renderList(8, x => {
    return createVNode("span", _hoisted_3);
  }), 64))])) : _ctx.spinnerView === 'circles' ? (openBlock(), createBlock("span", _hoisted_4, [(openBlock(), createBlock(Fragment, null, renderList(8, x => {
    return createVNode("span", _hoisted_5);
  }), 64))])) : _ctx.spinnerView === 'spiral' ? (openBlock(), createBlock("i", _hoisted_6)) : _ctx.spinnerView === 'wavedots' ? (openBlock(), createBlock("span", _hoisted_7, [(openBlock(), createBlock(Fragment, null, renderList(5, x => {
    return createVNode("span", _hoisted_8);
  }), 64))])) : createCommentVNode("", true);
});

function styleInject(css, ref) {
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
}

var css_248z$1 = ".loading-wave-dots[data-v-00c1427c] {\n  position: relative;\n}\n.loading-wave-dots[data-v-00c1427c] .wave-item {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: inline-block;\n  margin-top: -8px/2;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  animation: loading-wave-dots-00c1427c linear 2.8s infinite;\n}\n.loading-wave-dots[data-v-00c1427c] .wave-item:first-child {\n  margin-left: -8px/2 + -32px;\n}\n.loading-wave-dots[data-v-00c1427c] .wave-item:nth-child(2) {\n  margin-left: -8px/2 + -16px;\n  animation-delay: 0.14s;\n}\n.loading-wave-dots[data-v-00c1427c] .wave-item:nth-child(3) {\n  margin-left: -8px/2;\n  animation-delay: 0.28s;\n}\n.loading-wave-dots[data-v-00c1427c] .wave-item:nth-child(4) {\n  margin-left: -8px/2 + 16px;\n  animation-delay: 0.42s;\n}\n.loading-wave-dots[data-v-00c1427c] .wave-item:last-child {\n  margin-left: -8px/2 + 32px;\n  animation-delay: 0.56s;\n}\n@keyframes loading-wave-dots-00c1427c {\n0% {\n    transform: translateY(0);\n    background: #bbb;\n}\n10% {\n    transform: translateY(-6px);\n    background: #999;\n}\n20% {\n    transform: translateY(0);\n    background: #bbb;\n}\n100% {\n    transform: translateY(0);\n    background: #bbb;\n}\n}\n.loading-circles[data-v-00c1427c] .circle-item {\n  width: 5px;\n  height: 5px;\n  animation: loading-circles-00c1427c linear 0.75s infinite;\n}\n.loading-circles[data-v-00c1427c] .circle-item:first-child {\n  margin-top: -5px/2 + -12px;\n  margin-left: -5px/2;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(2) {\n  margin-top: -5px/2 + -8.76px;\n  margin-left: -5px/2 + 8.76px;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(3) {\n  margin-top: -5px/2;\n  margin-left: -5px/2 + 12px;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(4) {\n  margin-top: -5px/2 + 8.76px;\n  margin-left: -5px/2 + 8.76px;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(5) {\n  margin-top: -5px/2 + 12px;\n  margin-left: -5px/2;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(6) {\n  margin-top: -5px/2 + 8.76px;\n  margin-left: -5px/2 + -8.76px;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(7) {\n  margin-top: -5px/2;\n  margin-left: -5px/2 + -12px;\n}\n.loading-circles[data-v-00c1427c] .circle-item:last-child {\n  margin-top: -5px/2 + -8.76px;\n  margin-left: -5px/2 + -8.76px;\n}\n@keyframes loading-circles-00c1427c {\n0% {\n    background: #dfdfdf;\n}\n90% {\n    background: #505050;\n}\n100% {\n    background: #dfdfdf;\n}\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item {\n  background: #666;\n  animation: loading-bubbles-00c1427c linear 0.75s infinite;\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item:first-child {\n  margin-top: -1px/2 + -12px;\n  margin-left: -1px/2;\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(2) {\n  margin-top: -1px/2 + -8.76px;\n  margin-left: -1px/2 + 8.76px;\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(3) {\n  margin-top: -1px/2;\n  margin-left: -1px/2 + 12px;\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(4) {\n  margin-top: -1px/2 + 8.76px;\n  margin-left: -1px/2 + 8.76px;\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(5) {\n  margin-top: -1px/2 + 12px;\n  margin-left: -1px/2;\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(6) {\n  margin-top: -1px/2 + 8.76px;\n  margin-left: -1px/2 + -8.76px;\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(7) {\n  margin-top: -1px/2;\n  margin-left: -1px/2 + -12px;\n}\n.loading-bubbles[data-v-00c1427c] .bubble-item:last-child {\n  margin-top: -1px/2 + -8.76px;\n  margin-left: -1px/2 + -8.76px;\n}\n@keyframes loading-bubbles-00c1427c {\n0% {\n    width: 1px;\n    height: 1px;\n    box-shadow: 0 0 0 3px #666;\n}\n90% {\n    width: 1px;\n    height: 1px;\n    box-shadow: 0 0 0 0 #666;\n}\n100% {\n    width: 1px;\n    height: 1px;\n    box-shadow: 0 0 0 3px #666;\n}\n}\n.loading-default[data-v-00c1427c] {\n  position: relative;\n  border: 1px solid #999;\n  animation: loading-rotating-00c1427c ease 1.5s infinite;\n}\n.loading-default[data-v-00c1427c]:before {\n  content: '';\n  position: absolute;\n  display: block;\n  top: 0;\n  left: 50%;\n  margin-top: -6px/2;\n  margin-left: -6px/2;\n  width: 6px;\n  height: 6px;\n  background-color: #999;\n  border-radius: 50%;\n}\n.loading-spiral[data-v-00c1427c] {\n  border: 2px solid #777;\n  border-right-color: transparent;\n  animation: loading-rotating-00c1427c linear 0.85s infinite;\n}\n@keyframes loading-rotating-00c1427c {\n0% {\n    transform: rotate(0);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n.loading-bubbles[data-v-00c1427c],\n.loading-circles[data-v-00c1427c] {\n  position: relative;\n}\n.loading-circles[data-v-00c1427c] .circle-item,\n.loading-bubbles[data-v-00c1427c] .bubble-item {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  display: inline-block;\n  border-radius: 50%;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(2),\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(2) {\n  animation-delay: 0.093s;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(3),\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(3) {\n  animation-delay: 0.186s;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(4),\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(4) {\n  animation-delay: 0.279s;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(5),\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(5) {\n  animation-delay: 0.372s;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(6),\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(6) {\n  animation-delay: 0.465s;\n}\n.loading-circles[data-v-00c1427c] .circle-item:nth-child(7),\n.loading-bubbles[data-v-00c1427c] .bubble-item:nth-child(7) {\n  animation-delay: 0.558s;\n}\n.loading-circles[data-v-00c1427c] .circle-item:last-child,\n.loading-bubbles[data-v-00c1427c] .bubble-item:last-child {\n  animation-delay: 0.651s;\n}\n";
styleInject(css_248z$1);

script$1.render = render$1;
script$1.__scopeId = "data-v-00c1427c";

/* eslint-disable no-console */
/**
 * console warning in production
 * @param {String} msg console content
 */

function warn(msg) {
  /* istanbul ignore else */
  {
    console.warn(`[Vue-infinite-loading warn]: ${msg}`);
  }
}
/**
 * console error
 * @param {String} msg console content
 */

function error(msg) {
  console.error(`[Vue-infinite-loading error]: ${msg}`);
}
const throttleer = {
  timers: [],
  caches: [],

  throttle(fn) {
    if (this.caches.indexOf(fn) === -1) {
      // cache current handler
      this.caches.push(fn); // save timer for current handler

      this.timers.push(setTimeout(() => {
        fn(); // empty cache and timer

        this.caches.splice(this.caches.indexOf(fn), 1);
        this.timers.shift();
      }, config.system.throttleLimit));
    }
  },

  reset() {
    // reset all timers
    this.timers.forEach(timer => {
      clearTimeout(timer);
    });
    this.timers.length = 0; // empty caches

    this.caches = [];
  }

};
const loopTracker = {
  isChecked: false,
  timer: null,
  times: 0,

  track() {
    // record track times
    this.times += 1; // try to mark check status

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.isChecked = true;
    }, config.system.loopCheckTimeout); // throw warning if the times of continuous calls large than the maximum times

    if (this.times > config.system.loopCheckMaxCalls) {
      error(ERRORS.INFINITE_LOOP);
      this.isChecked = true;
    }
  }

};
const scrollBarStorage = {
  key: '_infiniteScrollHeight',

  getScrollElm(elm) {
    return elm === window ? document.documentElement : elm;
  },

  save(elm) {
    const target = this.getScrollElm(elm); // save scroll height on the scroll parent

    target[this.key] = target.scrollHeight;
  },

  restore(elm) {
    const target = this.getScrollElm(elm);
    /* istanbul ignore else */

    if (typeof target[this.key] === 'number') {
      target.scrollTop = target.scrollHeight - target[this.key] + target.scrollTop;
    }

    this.remove(target);
  },

  remove(elm) {
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
  return str.replace(/[A-Z]/g, s => `-${s.toLowerCase()}`);
}
/**
 * get visibility for element
 * @param   {DOM}     elm
 * @return  {Boolean}
 */

function isVisible(elm) {
  return elm.offsetWidth + elm.offsetHeight > 0;
}

var script = /*#__PURE__*/defineComponent({
  name: 'InfiniteLoading',

  data() {
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
    isShowSpinner() {
      return this.status === STATUS.LOADING;
    },

    isShowError() {
      return this.status === STATUS.ERROR;
    },

    isShowNoResults() {
      return this.status === STATUS.COMPLETE && this.isFirstLoad;
    },

    isShowNoMore() {
      return this.status === STATUS.COMPLETE && !this.isFirstLoad;
    },

    slotStyles() {
      const styles = {};
      Object.keys(config.slots).forEach(key => {
        const name = kebabCase(key);

        if ( // no slot and the configured default slot is not a Vue component
        !this.$slots[name] && !config.slots[key].render || // has slot and slot is pure text node
        this.$slots[name] && !this.$slots[name][0].tag) {
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
    identifier() {
      this.stateChanger.reset();
    }

  },

  mounted() {
    this.$watch('forceUseInfiniteWrapper', () => {
      this.scrollParent = this.getScrollParent();
    }, {
      immediate: true
    });

    this.scrollHandler = ev => {
      if (this.status === STATUS.READY) {
        if (ev && ev.constructor === Event && isVisible(this.$el)) {
          throttleer.throttle(this.attemptLoad);
        } else {
          this.attemptLoad();
        }
      }
    };

    setTimeout(() => {
      this.scrollHandler();
      this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);
    }, 1);
    eventHub.$on('$InfiniteLoading:loaded', ev => {
      this.isFirstLoad = false;

      if (this.direction === 'top') {
        // wait for DOM updated
        this.$nextTick(() => {
          scrollBarStorage.restore(this.scrollParent);
        });
      }

      if (this.status === STATUS.LOADING) {
        this.$nextTick(this.attemptLoad.bind(null, true));
      }

      if (!ev || ev.target !== this) {
        warn(WARNINGS.STATE_CHANGER);
      }
    });
    eventHub.$on('$InfiniteLoading:complete', ev => {
      this.status = STATUS.COMPLETE; // force re-complation computed properties to fix the problem of get slot text delay

      this.$nextTick(() => {
        this.$forceUpdate();
      });
      this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);

      if (!ev || ev.target !== this) {
        warn(WARNINGS.STATE_CHANGER);
      }
    });
    eventHub.$on('$InfiniteLoading:reset', ev => {
      this.status = STATUS.READY;
      this.isFirstLoad = true;
      scrollBarStorage.remove(this.scrollParent);
      this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg); // wait for list to be empty and the empty action may trigger a scroll event

      setTimeout(() => {
        throttleer.reset();
        this.scrollHandler();
      }, 1);

      if (!ev || ev.target !== this) {
        warn(WARNINGS.IDENTIFIER);
      }
    });
    /**
     * change state for this component, pass to the callback
     */

    this.stateChanger = {
      loaded: () => {
        this.$emit('$InfiniteLoading:loaded', {
          target: this
        });
        eventHub.$emit('$InfiniteLoading:loaded', {
          target: this
        });
      },
      complete: () => {
        this.$emit('$InfiniteLoading:complete', {
          target: this
        });
        eventHub.$emit('$InfiniteLoading:complete', {
          target: this
        });
      },
      reset: () => {
        this.$emit('$InfiniteLoading:reset', {
          target: this
        });
        eventHub.$emit('$InfiniteLoading:reset', {
          target: this
        });
      },
      error: () => {
        this.status = STATUS.ERROR;
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
  deactivated() {
    /* istanbul ignore else */
    if (this.status === STATUS.LOADING) {
      this.status = STATUS.READY;
    }

    this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);
  },

  activated() {
    this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);
  },

  methods: {
    /**
     * attempt trigger load
     * @param {Boolean} isContinuousCall  the flag of continuous call, it will be true
     *                                    if this method be called in the `loaded`
     *                                    event handler
     */
    attemptLoad(isContinuousCall) {
      if (this.status !== STATUS.COMPLETE && isVisible(this.$el) && this.getCurrentDistance() <= this.distance) {
        this.status = STATUS.LOADING;

        if (this.direction === 'top') {
          // wait for spinner display
          this.$nextTick(() => {
            scrollBarStorage.save(this.scrollParent);
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
    getCurrentDistance() {
      let distance;

      if (this.direction === 'top') {
        distance = typeof this.scrollParent.scrollTop === 'number' ? this.scrollParent.scrollTop : this.scrollParent.pageYOffset;
      } else {
        const infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect().top;
        const scrollElmOffsetTopFromBottom = this.scrollParent === window ? window.innerHeight : this.scrollParent.getBoundingClientRect().bottom;
        distance = infiniteElmOffsetTopFromBottom - scrollElmOffsetTopFromBottom;
      }

      return distance;
    },

    /**
     * get the first scroll parent of an element
     * @param  {DOM} elm    cache element for recursive search
     * @return {DOM}        the first scroll parent
     */
    getScrollParent(elm = this.$el) {
      let result;

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

  unmounted() {
    /* istanbul ignore else */
    if (!this.status !== STATUS.COMPLETE) {
      throttleer.reset();
      scrollBarStorage.remove(this.scrollParent);
      this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);
    }
  }

});

const _withId = /*#__PURE__*/withScopeId("data-v-0dfcd296");

pushScopeId("data-v-0dfcd296");

const _hoisted_1 = {
  class: "infinite-loading-container"
};

const _hoisted_2 = /*#__PURE__*/createVNode("br", null, null, -1);

popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_spinner = resolveComponent("spinner");

  return openBlock(), createBlock("div", _hoisted_1, [withDirectives(createVNode("div", {
    class: "infinite-status-prompt",
    style: _ctx.slotStyles.spinner
  }, [renderSlot(_ctx.$slots, "spinner", {
    isFirstLoad: _ctx.isFirstLoad
  }, () => [createVNode(_component_spinner, {
    spinner: _ctx.spinner
  }, null, 8, ["spinner"])])], 4), [[vShow, _ctx.isShowSpinner]]), withDirectives(createVNode("div", {
    class: "infinite-status-prompt",
    style: _ctx.slotStyles.noResults
  }, [renderSlot(_ctx.$slots, "no-results", {}, () => [_ctx.slots.noResults.render ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.slots.noResults), {
    key: 0
  })) : (openBlock(), createBlock(Fragment, {
    key: 1
  }, [createTextVNode(toDisplayString(_ctx.slots.noResults), 1)], 64))])], 4), [[vShow, _ctx.isShowNoResults]]), withDirectives(createVNode("div", {
    class: "infinite-status-prompt",
    style: _ctx.slotStyles.noMore
  }, [renderSlot(_ctx.$slots, "no-more", {}, () => [_ctx.slots.noMore.render ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.slots.noMore), {
    key: 0
  })) : (openBlock(), createBlock(Fragment, {
    key: 1
  }, [createTextVNode(toDisplayString(_ctx.slots.noMore), 1)], 64))])], 4), [[vShow, _ctx.isShowNoMore]]), withDirectives(createVNode("div", {
    class: "infinite-status-prompt",
    style: _ctx.slotStyles.error
  }, [renderSlot(_ctx.$slots, "error", {
    trigger: _ctx.attemptLoad
  }, () => [_ctx.slots.error.render ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.slots.error), {
    key: 0,
    trigger: _ctx.attemptLoad
  }, null, 8, ["trigger"])) : (openBlock(), createBlock(Fragment, {
    key: 1
  }, [createTextVNode(toDisplayString(_ctx.slots.error) + " ", 1), _hoisted_2, createVNode("button", {
    class: "btn-try-infinite",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.attemptLoad && _ctx.attemptLoad(...args)),
    textContent: toDisplayString(_ctx.slots.errorBtnText)
  }, null, 8, ["textContent"])], 64))])], 4), [[vShow, _ctx.isShowError]])]);
});

var css_248z = ".infinite-loading-container[data-v-0dfcd296] {\n  clear: both;\n  text-align: center;\n}\n.infinite-loading-container[data-v-0dfcd296] *[class^=loading-] {\n  display: inline-block;\n  margin: 5px 0;\n  width: 28px;\n  height: 28px;\n  font-size: 28px;\n  line-height: 28px;\n  border-radius: 50%;\n}\n.btn-try-infinite[data-v-0dfcd296] {\n  margin-top: 5px;\n  padding: 5px 10px;\n  color: #999;\n  font-size: 14px;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n  outline: none;\n  cursor: pointer;\n}\n.btn-try-infinite[data-v-0dfcd296]:not(:active):hover {\n  opacity: 0.8;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-0dfcd296";

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('VueInfiniteLoading', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
