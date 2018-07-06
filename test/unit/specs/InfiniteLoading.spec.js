/* eslint-disable no-console */

import Vue from 'vue/dist/vue.common';
import InfiniteLoading from '../../../src/components/InfiniteLoading';

Vue.config.productionTip = false;

/**
 * check display status for a specific element
 * @param  {DOM}      elm
 * @return {Boolean}
 */
function isShow(elm) {
  return getComputedStyle(elm).display !== 'none';
}

/**
 * continues call the specified number of times for a function
 * @param  {Function} fn    target function
 * @param  {Number}   times calls
 * @param  {Function} cb    [description]
 */
function continuesCall(fn, times, cb) {
  if (times) {
    fn();
    setTimeout(() => {
      continuesCall(fn, times - 1, cb);
    }, 1);
  } else {
    cb();
  }
}

describe('vue-infinite-loading', () => {
  let vm; // save Vue model
  const basicConfig = {
    data: {
      list: [],
      isDivScroll: false,
      direction: 'bottom',
      spinner: 'default',
    },
    template: `
      <div :style="{ overflow: isDivScroll ? 'auto' : 'visible' }">
        <ul>
          <li v-for="item in list" v-text="item"></li>
        </ul>
        <infinite-loading
          :direction="direction"
          @infinite="infiniteHandler"
          ref="infiniteLoading"
          :spinner="spinner"
          >
        </infinite-loading>
      </div>
    `,
    components: { InfiniteLoading },
    methods: {
      infiniteHandler() {},
    },
  };

  before(() => {
    // insert global CSS
    const styles = document.createElement('style');

    styles.id = 'testing-style';
    styles.innerHTML = `
      body {
        margin: 0;
      }
      div {
        height: 200px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul li {
        height: 40px;
      }
    `;

    document.body.appendChild(styles);
  });

  after(() => {
    // remove global CSS
    document.getElementById('testing-style').remove();
  });

  beforeEach(() => {
    // create Vue model before each case start
    const container = document.createElement('div');

    container.id = 'app';
    document.body.appendChild(container);
  });

  afterEach(() => {
    basicConfig.data.list = [];
    // destroy Vue model after each case complete
    vm.$el.parentNode.removeChild(vm.$el);

    if (vm.$refs.infiniteLoading) {
      vm.$refs.infiniteLoading.$destroy();
    }

    if (document.getElementById('app')) {
      document.getElementById('app').remove();
    }
  });

  it('should complete a standard life circle\n      (init -> loading -> loaded -> complete)', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        infiniteHandler: function infiniteHandler($state) {
          for (let i = 0, j = this.list.length; i < 3; i += 1) {
            this.list.push(j + i);
          }

          const expectedLength = this.list.length;
          const isComplete = expectedLength > 6;

          // check spinner
          expect(isShow(this.$el.querySelector('.loading-default'))).to.be.true;

          if (isComplete) {
            $state.complete();
          } else {
            $state.loaded();
          }

          this.$nextTick(() => {
            // check list items
            expect(this.$el.querySelectorAll('ul li')).to.have.lengthOf(expectedLength);

            if (isComplete) {
              // check no more text
              expect(isShow(this.$el.querySelectorAll('.infinite-status-prompt')[1])).to.be.true;
              done();
            }
          });
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should not trigger load again before the last load is complete\n      (use div as the container and spiral spinner)', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [],
        isDivScroll: true,
        direction: 'bottom',
        spinner: 'spiral',
      },
      methods: {
        infiniteHandler: function infiniteHandler() {
          const scrollParent = this.$refs.infiniteLoading.scrollParent;
          const loadCountEachTime = 10;

          this.list.push(...new Array(loadCountEachTime + 1).join('1').split(''));
          this.$nextTick(() => {
            // trigger scroll event manually
            scrollParent.scrollTop = scrollParent.scrollHeight;

            // wait for the scroll event handler process scroll event
            setTimeout(() => {
              expect(this.list).to.have.lengthOf(loadCountEachTime);
              done();
            }, 10);
          });
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should works again when reset it after a completion\n      (use top direction and bubbles spinner)', (done) => {
    let calledTimes = 0;

    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [],
        isDivScroll: false,
        direction: 'top',
        spinner: 'bubbles',
      },
      methods: {
        infiniteHandler: function infiniteHandler($state) {
          calledTimes += 1;

          if (calledTimes === 1) {
            $state.complete();
            this.$nextTick(() => {
              // check no results text
              expect(isShow(this.$el.querySelectorAll('.infinite-status-prompt')[0])).to.be.true;

              // reset component
              $state.reset();
            });
          } else if (calledTimes === 2) {
            // check spinner
            expect(isShow(this.$el.querySelector('.loading-bubbles'))).to.be.true;
            done();
          }
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should always load data until fill up the container\n      (use div as the container and circles spinner)', (done) => {
    let timer;

    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [],
        isDivScroll: true,
        direction: 'bottom',
        spinner: 'circles',
      },
      methods: {
        infiniteHandler: function infiniteHandler($state) {
          this.list.push(this.list.length + 1);
          this.$nextTick(() => {
            $state.loaded();
          });

          // wait for the container be filled up
          clearTimeout(timer);
          timer = setTimeout(() => {
            const listHeight = parseInt(getComputedStyle(this.$el.querySelector('ul')).height, 10);
            const itemHeight = parseInt(getComputedStyle(this.$el.querySelector('li')).height, 10);
            const expectedCount = listHeight / itemHeight;

            expect(this.list.length).to.be.at.least(expectedCount);
            done();
          }, 100);
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should works properly with scroll plugins through the `infinite-wrapper` property', (done) => {
    const app = document.getElementById('app');
    const wrapper = document.createElement('div');

    app.appendChild(wrapper);
    app.setAttribute('infinite-wrapper', ''); // add `infinite-wrapper` property for app container
    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        infiniteHandler: function infiniteHandler() {
          expect(this.$refs.infiniteLoading.scrollParent).to.equal(app);
          done();
        },
      },
    }));

    vm.$mount(wrapper);
  });

  it('should not works when deactivated by the `keep-alive` feature\n      (use top direction and use div as the container)', (done) => {
    let calledTimes = 0;
    const InfiniteView = Object.assign({}, basicConfig, {
      data() {
        return {
          list: [],
          isDivScroll: true,
          direction: 'top',
          spinner: 'default',
        };
      },
      methods: {
        infiniteHandler: function infiniteHandler($state) {
          calledTimes += 1;

          if (calledTimes === 1) {
            // change view to deactivate the component
            this.$parent.currentView = null;
            this.$nextTick(() => {
              // trigger loaded event
              $state.loaded();
              this.$nextTick(() => {
                // doesnot care the loaded event when it be deactivated
                expect(calledTimes).to.equal(1);
                done();
              });
            });
          }
        },
      },
    });

    vm = new Vue({
      data: {
        currentView: 'InfiniteView',
      },
      template: `
        <keep-alive>
          <component :is="currentView"></component>
        </keep-alive>
      `,
      components: {
        InfiniteView,
      },
    });

    vm.$mount('#app');
  });

  it('should still works properly with the deprecated property `:on-infinite` but throw warning', (done) => {
    const originalError = console.warn;
    let isThrowWarn;

    console.warn = (text) => {
      if (text.indexOf('@infinite') > -1) {
        isThrowWarn = true;
      }
    };

    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        onInfinite: function onInfinite() {
          expect(isThrowWarn).to.be.true;
          console.warn = originalError;
          done();
        },
      },
      template: `
        <infinite-loading
          :on-infinite="onInfinite"
          >
        </infinite-loading>
      `,
    }));

    vm.$mount('#app');
  });

  it('should interpolate custom spinner slot', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      mounted: function mounted() {
        expect(this.$el.querySelector('.icon-spinner')).to.be.not.null;
        done();
      },
      template: `
        <infinite-loading>
          <div slot="spinner">
            <i class="icon-spinner"></i>
          </div>
        </infinite-loading>
      `,
    }));

    vm.$mount('#app');
  });

  it('should support hide load result through blank slots', (done) => {
    let calledTimes = 0;

    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        infiniteHandler: function infiniteHandler($state) {
          if (calledTimes) {
            $state.loaded();
            $state.complete();
            this.$nextTick(() => {
              // check for no-more result display
              expect(isShow(this.$el.querySelectorAll('.infinite-status-prompt')[1])).to.be.false;
              done();
            });
          } else {
            calledTimes += 1;
            $state.complete();
            this.$nextTick(() => {
              // check for no-result result display
              expect(isShow(this.$el.querySelectorAll('.infinite-status-prompt')[0])).to.be.false;

              // reset component to check no-more status
              $state.reset();
            });
          }
        },
      },
      template: `
        <infinite-loading
          @infinite="infiniteHandler"
          ref="infiniteLoading"
          >
          <span slot="no-results"></span>
          <span slot="no-more"></span>
        </infinite-loading>
      `,
    }));

    vm.$mount('#app');
  });

  it('should throttle properly for the scroll event handler\n      (use div as the container and wave dots spinner)', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [...new Array(20).join('1').split('')],
        isDivScroll: true,
        direction: 'bottom',
        spinner: 'waveDots',
      },
      mounted: function mounted() {
        const scrollParent = this.$refs.infiniteLoading.scrollParent;
        const spyFn = sinon.spy(this.$refs.infiniteLoading, 'attemptLoad');
        const alreadyCalledTimes = 1; // it will be called immediately after mount

        continuesCall(() => {
          scrollParent.scrollTop += 10;
        }, 10, () => {
          expect(spyFn).to.have.been.callCount(1 + alreadyCalledTimes);
          setTimeout(() => {
            expect(spyFn).to.have.been.callCount(1 + alreadyCalledTimes);
            done();
          }, this.$refs.infiniteLoading.throttleLimit + 10);
        });
      },
    }));

    vm.$mount('#app');
  });

  it('should still works properly with the $refs.component.$emit but throw warning', (done) => {
    const originalError = console.warn;
    let throwWarnTimes = 0;

    console.warn = (text) => {
      if (text.indexOf('$state') > -1) {
        throwWarnTimes += 1;
      }
    };

    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        infiniteHandler: function infiniteHandler() {
          if (!throwWarnTimes) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            expect(throwWarnTimes).to.equal(2);
            console.warn = originalError;
            done();
          }
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should find my forcible element as scroll wrapper when using `force-use-infinite-wrapper` property', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      template: `
        <div infinite-wrapper>
          <div style="overflow: auto;">
            <div style="overflow: auto;">
              <ul>
                <li v-for="item in list" v-text="item"></li>
              </ul>
              <infinite-loading
                :direction="direction"
                @infinite="infiniteHandler"
                ref="infiniteLoading"
                force-use-infinite-wrapper="true"
                >
              </infinite-loading>
            </div>
          </div>
        </div>
      `,
      methods: {
        infiniteHandler: function infiniteHandler() {
          expect(this.$refs.infiniteLoading.scrollParent).to.equal(this.$el);
          done();
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should throw error when the component be in a infinite loop caused by a wrapper with unfixed height', (done) => {
    const originalError = console.error;
    let isThrowError;

    console.error = (text) => {
      if (text.indexOf('issues/55') > -1) {
        isThrowError = true;
      }
    };

    vm = new Vue(Object.assign({}, basicConfig, {
      template: `
        <div style="overflow: auto; height: auto;">
          <ul>
            <li v-for="item in list" v-text="item"></li>
          </ul>
          <infinite-loading
            :direction="direction"
            @infinite="infiniteHandler"
            ref="infiniteLoading"
            >
          </infinite-loading>
        </div>
      `,
      methods: {
        infiniteHandler: function infiniteHandler($state) {
          if (!isThrowError) {
            this.list.push(this.list.length + 1);
            $state.loaded();
          } else {
            $state.complete();
            expect(isThrowError).to.be.true;
            console.error = originalError;
            // wait for the loop check flag be marked as true
            setTimeout(() => {
              expect(this.$refs.infiniteLoading.infiniteLoopChecked).to.be.true;
              done();
            }, 1501);
          }
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should search scroll wrapper again when change the `force-use-infinite-wrapper` property', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        forceUseInfiniteWrapper: true,
      },
      template: `
        <div infinite-wrapper>
          <div style="overflow: auto;">
            <infinite-loading
              :force-use-infinite-wrapper="forceUseInfiniteWrapper"
              @infinite="infiniteHandler"
              ref="infiniteLoading"
              >
            </infinite-loading>
          </div>
        </div>
      `,
      mounted: function mounted() {
        expect(this.$refs.infiniteLoading.scrollParent).to.equal(this.$el);
        this.forceUseInfiniteWrapper = false;
        this.$nextTick(() => {
          expect(this.$refs.infiniteLoading.scrollParent).to.equal(this.$el.querySelector('div'));
          done();
        });
      },
    }));

    vm.$mount('#app');
  });
});
