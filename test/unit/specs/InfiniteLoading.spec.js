import Vue from 'vue/dist/vue.common';
import InfiniteLoading from '../../../src/components/InfiniteLoading';

Vue.config.productionTip = false;

function isShow(elm) {
  const styles = getComputedStyle(elm);

  return styles.getPropertyValue('display') !== 'none';
}

describe('InfiniteLoading.vue', () => {
  let vm;
  const initConf = {
    data() {
      return {
        list: [],
        distance: 50,
        isLoadedAll: false,
        isDivScroll: true,
        isCustomSpinner: false,
        listContainerHeight: 200,
        listItemHeight: 20,
        direction: 'bottom',
      };
    },
    template: `
      <div style="margin: 0; padding: 0;"
          :style="{
            overflow: isDivScroll ? 'auto' : 'visible',
            height: listContainerHeight + 'px'
          }">
        <ul style="margin: 0; padding: 0;">
          <li v-for="item in list" v-text="item"
              :style="{ height: listItemHeight + 'px' }">
          </li>
        </ul>
        <infinite-loading :distance="distance"
                          :direction="direction"
                          :on-infinite="onInfinite"
                          v-if="!isLoadedAll"
                          ref="infiniteLoading">
          <span slot="spinner" v-if="isCustomSpinner">
            <i class="custom-spinner"></i>
          </span>
        </infinite-loading>
      </div>
    `,
    components: { InfiniteLoading },
    methods: {
      onInfinite() {},
    },
  };

  // create new Vue instance for every test case
  beforeEach(() => {
    const container = document.createElement('div');
    container.setAttribute('id', 'app');
    document.body.appendChild(container);

    vm = new Vue(initConf);
  });

  afterEach(() => {
    /**
     * because of call the $destroy method of parent cannot trigger
     * destroy event for child component in Vue.js 2.0.0-rc6
     */
    if (vm.$refs.infiniteLoading) {
      vm.$refs.infiniteLoading.$destroy();
    }
    vm.$destroy(true);
    /**
     * because of pass true as the argument for destroy method cannot
     * remove element from DOM in Vue.js 2.0.0-rc6
     */
    if (vm.$el) {
      vm.$el.remove();
    }
  });

  it('should render a basic template', (done) => {
    vm.isDivScroll = false;
    setTimeout(() => {
      vm.$mount('#app');
      expect(vm.$el.querySelector('.loading-default')).to.be.ok;
      done();
    }, 1);
  });

  it('should execute callback and display a spinner immediately after initialize', (done) => {
    vm.onInfinite = function test() {
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelector('.loading-default'))).to.be.true;
        done();
      });
    };

    vm.$mount('#app');
  });

  it('should not to execute callback if the previous loading has not be completed', (done) => {
    vm.onInfinite = function test() {
      const len = this.list.length + 1;
      const infiniteWrapper = this.$refs.infiniteLoading.scrollParent;

      for (let i = len; i < len + 20; i += 1) {
        this.list.push(i);
      }

      Vue.nextTick(() => {
        if (this.list.length === 20) {
          infiniteWrapper.addEventListener('scroll', () => {
            expect(this.list).to.have.lengthOf(20);
            done();
          });

          // trigger scroll event manually
          infiniteWrapper.scrollTop = infiniteWrapper.scrollHeight;
        }
      });
    }.bind(vm);

    vm.$mount('#app');
  });

  it('should be destroyed completely by v-if', (done) => {
    vm.onInfinite = function test() {
      this.isLoadedAll = true;
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('.loading-default')).to.not.be.ok;
        done();
      });
    }.bind(vm);

    vm.$mount('#app');
  });

  it('should display no results prompt', (done) => {
    vm.onInfinite = function test() {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelectorAll('.infinite-status-prompt')[0])).to.be.true;
        done();
      });
    }.bind(vm);

    vm.$mount('#app');
  });

  it('should display no more data prompt', (done) => {
    vm.onInfinite = function test() {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
      // test for whether trigger again after complete
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelectorAll('.infinite-status-prompt')[1])).to.be.true;
        done();
      });
    }.bind(vm);

    vm.$mount('#app');
  });

  it('should load results to fill up the container', (done) => {
    const expectedCount = Math.floor(vm.listContainerHeight / vm.listItemHeight);
    let i = 0;
    let timer;

    vm.onInfinite = function test() {
      setTimeout(() => {
        i += 1;
        this.list.push(i);
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (i >= expectedCount) {
            done();
          } else {
            done(new Error('List not be fill up!'));
          }
        }, 100);
      }, 1);
    }.bind(vm);

    vm.$mount('#app');
  });

  it('should reset component and call onInfinite again', (done) => {
    let callCount = 0;
    vm.onInfinite = function test() {
      if (!callCount) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      } else {
        done();
      }

      callCount += 1;
    }.bind(vm);

    vm.$mount('#app');
  });

  it('should display the custom spinner if customize it with slot', (done) => {
    vm.isCustomSpinner = true;
    vm.distance = 100;
    vm.$mount('#app');

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.custom-spinner')).to.be.ok;
      done();
    });
  });

  it('should load data when scroll top with window (direction attribute)', (done) => {
    vm.isDivScroll = false;
    vm.direction = 'top';
    vm.onInfinite = function test() {
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelector('.loading-default'))).to.be.true;
        done();
      });
    };

    vm.$mount('#app');
  });

  it('should load data when scroll top (direction attribute)', (done) => {
    vm.direction = 'top';
    vm.onInfinite = function test() {
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelector('.loading-default'))).to.be.true;
        done();
      });
    };

    vm.$mount('#app');
  });

  it('should load data once when deactivated by keep-alive feature', (done) => {
    let callCount = 0;
    let app;

    const InfiniteComponent = {
      data: initConf.data,
      template: initConf.template,
      components: initConf.components,
      methods: {
        onInfinite() {
          callCount += 1;
          if (callCount === 1) {
            this.$parent.currentView = null;
            Vue.nextTick(() => {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              setTimeout(() => {
                expect(callCount).to.equal(1);
                app.$destroy(true);
                if (app.$el) {
                  app.$el.remove();
                }
                done();
              }, 1000);
            });
          }
        },
      },
    };

    app = new Vue({
      data() {
        return {
          currentView: 'InfiniteComponent',
        };
      },
      template: `
        <keep-alive>
          <component :is="currentView"></component>
        </keep-alive>
      `,
      components: {
        InfiniteComponent,
      },
    });

    app.$mount('#app');
  });

  it('should work with customize scroll plugin like perfect-scroll', (done) => {
    const infiniteWrapper = document.createElement('div');
    const wrapper = document.createElement('div');

    vm.isDivScroll = false;
    infiniteWrapper.setAttribute('infinite-wrapper', '');
    document.getElementById('app').appendChild(infiniteWrapper);
    infiniteWrapper.appendChild(wrapper);

    vm.$mount(wrapper);

    Vue.nextTick(() => {
      expect(vm.$refs.infiniteLoading.scrollParent).to.equal(infiniteWrapper);
      done();
    }, 1);
  });
});
