/* eslint-disable no-console */

import Vue from 'vue/dist/vue.common';
import { isShow, continuesCall, fakeBox } from '../utils';
import config from '../../../src/config';
import { loopTracker } from '../../../src/utils';
import InfiniteLoading from '../../../src/components/InfiniteLoading.vue';

describe('vue-infinite-loading:component', () => {
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

    // use development mode
    config.mode = 'development';
  });

  after(() => {
    // remove global CSS
    document.getElementById('testing-style').remove();

    // restore app mode
    config.mode = Vue.config.productionTip ? 'development' : 'production';
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
              expect(isShow(this.$el.querySelector('.infinite-status-prompt:nth-child(3)'))).to.be.true;
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
          const { scrollParent } = this.$refs.infiniteLoading;
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
              expect(isShow(this.$el.querySelector('.infinite-status-prompt:nth-child(2)'))).to.be.true;

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
          spinner: 'unknown',
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
    let isThrowWarn;

    console.warn = fakeBox(console.warn, (text) => {
      if (text.indexOf('@infinite') > -1) {
        isThrowWarn = true;
      }
    });

    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        onInfinite: function onInfinite() {
          expect(isThrowWarn).to.be.true;
          console.warn = fakeBox();
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

  it('should remove slot styles if does not configure with `template` tag', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        infiniteHandler: function infiniteHandler($state) {
          // expect empty styles for no results slot
          expect(this.$el.querySelector('.infinite-status-prompt:nth-child(2)').style.color).to.be.empty;

          // expect valid styles for no more slot
          expect(this.$el.querySelector('.infinite-status-prompt:nth-child(3)').style.color).to.not.be.empty;
          $state.complete();
          done();
        },
      },
      template: `
        <infinite-loading @infinite="infiniteHandler">
          <span slot="no-results"></span>
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
        const { scrollParent } = this.$refs.infiniteLoading;
        const spyFn = sinon.spy(this.$refs.infiniteLoading, 'attemptLoad');
        const alreadyCalledTimes = 1; // it will be called immediately after mount

        continuesCall(() => {
          scrollParent.scrollTop += 10;
        }, 10, () => {
          expect(spyFn).to.have.been.callCount(0 + alreadyCalledTimes);
          setTimeout(() => {
            expect(spyFn).to.have.been.callCount(1 + alreadyCalledTimes);
            done();
          }, config.system.throttleLimit + 10);
        });
      },
    }));

    vm.$mount('#app');
  });

  it('should still works properly with the $refs.component.$emit but throw warning', (done) => {
    let throwWarnTimes = 0;

    console.warn = fakeBox(console.warn, (text) => {
      if (text.indexOf('$state') > -1) {
        throwWarnTimes += 1;
      }
    });

    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        infiniteHandler: function infiniteHandler() {
          if (!throwWarnTimes) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            expect(throwWarnTimes).to.equal(2);
            console.warn = fakeBox();
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
    let isThrowError;

    console.error = fakeBox(console.error, (text) => {
      if (text.indexOf('issues/55') > -1) {
        isThrowError = true;
      }
    });

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
            console.error = fakeBox();
            // wait for the loop check flag be marked as true
            setTimeout(() => {
              expect(loopTracker.isChecked).to.be.true;
              done();
            }, config.system.loopCheckTimeout);
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

  it('should find my forcible element as scroll wrapper when using `force-use-infinite-wrapper` as seletor', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      template: `
        <div class="scroll">
          <div style="overflow: auto;">
            <div style="overflow: auto;">
              <ul>
                <li v-for="item in list" v-text="item"></li>
              </ul>
              <infinite-loading
                :direction="direction"
                @infinite="infiniteHandler"
                ref="infiniteLoading"
                force-use-infinite-wrapper=".scroll"
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

  it('should be reset if received `reset` event or change `identifier`, and throw warning if use the event way', (done) => {
    let triggerTimes = 0;
    let isThrowWarn;

    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [],
        identifier: '',
      },
      template: `
        <div style="overflow: auto; height: 10px;">
          <p style="height: 15px;">balabala</p>
          <infinite-loading
            :identifier="identifier"
            @infinite="infiniteHandler"
            ref="infiniteLoading">
          </infinite-loading>
        </div>
      `,
      methods: {
        infiniteHandler: function infiniteHandler() {
          switch (triggerTimes += 1) {
            case 1:
              console.warn = fakeBox(console.warn, (text) => {
                if (text.indexOf('identifier') > -1) {
                  isThrowWarn = true;
                }
              });

              // emit reset event to reset component
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
              console.warn = fakeBox();
              break;
            case 2:
              // expect get warning if use reset event
              expect(isThrowWarn).to.be.true;

              // trigger scroll manually to test throttle
              this.$refs.infiniteLoading.scrollParent.scrollTop += 1;

              // change identifier to reset component (also clear the throttleer)
              this.identifier = +new Date();

              break;
            case 3:
              done();
              break;
            default:
          }
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should display error message and support retry when load failed', (done) => {
    let triggerTimes = 0;

    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        infiniteHandler: function infiniteHandler($state) {
          switch (triggerTimes += 1) {
            case 1:
              $state.error();
              this.$nextTick(() => {
                const btnRetry = this.$el.querySelector('.btn-try-infinite');

                expect(btnRetry).to.be.not.null;

                // trigger load again
                btnRetry.click();
              });
              break;
            case 2:
              done();
              break;
            default:
          }
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should support use a component as the default spinner', (done) => {
    const spinnerId = 'custom-spinner';

    // override default slot spinner
    config.slots.spinner = { template: `<div id="${spinnerId}">Loading...</div>` };

    vm = new Vue(Object.assign({}, basicConfig, {
      template: `
        <infinite-loading
          @infinite="infiniteHandler">
        </infinite-loading>
      `,
      methods: {
        infiniteHandler: function infiniteHandler() {
          // assert custom spinner
          expect(this.$el.querySelector(`#${spinnerId}`)).to.be.not.null;

          // restore config
          config.slots.spinner = '';
          done();
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should support use a string as the default spinner', (done) => {
    config.slots.spinner = 'custom-spinner';

    vm = new Vue(Object.assign({}, basicConfig, {
      template: `
        <infinite-loading
          @infinite="infiniteHandler">
        </infinite-loading>
      `,
      methods: {
        infiniteHandler: function infiniteHandler() {
          // assert custom spinner
          expect(this.$el.innerHTML).to.contain(config.slots.spinner);

          // restore config
          config.slots.spinner = '';
          done();
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should save and restore scroll bar when using top direction', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [1, 2, 3, 4, 5],
      },
      template: `
        <div style="overflow: auto; height: 100px;">
          <ul>
            <li v-for="item in list" v-text="item"></li>
          </ul>
          <infinite-loading
            direction="top"
            @infinite="infiniteHandler">
          </infinite-loading>
        </div>
      `,
      methods: {
        infiniteHandler($state) {
          expect(this.$el.scrollTop).to.equal(0);
          this.list.push(6, 7, 8, 9, 10);
          $state.loaded();

          // wait for scroll bar restore
          setTimeout(() => {
            expect(this.$el.scrollTop).to.not.equal(0);
            done();
          }, 100);
        },
      },
    }));

    vm.$mount('#app');
  });
});
