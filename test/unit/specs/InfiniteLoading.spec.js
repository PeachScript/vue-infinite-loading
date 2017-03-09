import Vue from 'vue';
import InfiniteLoading from '../../../src/components/InfiniteLoading';

function isShow(elm) {
  const styles = getComputedStyle(elm);

  return styles.getPropertyValue('display') !== 'none';
}

describe('InfiniteLoading.vue', () => {
  let vm;

  // create new Vue instance for every test case
  beforeEach(() => {
    vm = new Vue({
      data: {
        list: [],
        distance: 50,
        isLoadedAll: false,
        isDivScroll: true,
        isCustomSpinner: false,
        listContainerHeight: 200,
        listItemHeight: 20,
        direction: 'bottom',
      },
      template: `
        <div style="margin: 0; padding: 0;"
            :style="{
              overflow: isDivScroll ? 'auto' : 'visible',
              height: listContainerHeight + 'px'
            }">
          <ul style="margin: 0; padding: 0;">
            <li v-for="item in list" v-text="item"
                :style="{ height: listItemHeight + 'px' }"
            }"></li>
          </ul>
          <infinite-loading :distance="distance"
                            :direction="direction"
                            :on-infinite="onInfinite"
                            v-if="!isLoadedAll">
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
    });
  });

  afterEach(() => {
    vm.$destroy(true);
  });

  it('should render a basic template', (done) => {
    vm.isDivScroll = false;
    setTimeout(() => {
      vm.$mount().$appendTo('body');
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

    vm.$mount().$appendTo('body');
  });

  it('should not to execute callback if the previous loading has not be completed', (done) => {
    vm.onInfinite = function test() {
      const len = this.list.length + 1;
      for (let i = len; i < len + 20; i++) {
        this.list.push(i);
      }

      Vue.nextTick(() => {
        if (this.list.length === 20) {
          vm.$el.addEventListener('scroll', () => {
            expect(this.list).to.have.lengthOf(20);
            done();
          });

          // trigger scroll event manually
          vm.$el.scrollTop = vm.$el.scrollHeight;
        }
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should be destroyed completely by v-if', (done) => {
    vm.onInfinite = function test() {
      this.isLoadedAll = true;
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('.loading-default')).to.not.be.ok;
        done();
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should display no results prompt', (done) => {
    vm.onInfinite = function test() {
      Vue.nextTick(() => {
        this.$broadcast('$InfiniteLoading:complete');
        Vue.nextTick(() => {
          expect(isShow(vm.$el.querySelectorAll('.infinite-status-prompt')[0])).to.be.true;
          done();
        });
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should display no more data prompt', (done) => {
    let i = 0;
    vm.onInfinite = function test() {
      this.list.push(++i);
      Vue.nextTick(() => {
        this.$broadcast('$InfiniteLoading:loaded');
        this.$broadcast('$InfiniteLoading:complete');
        this.$broadcast('$InfiniteLoading:loaded'); // test for whether trigger again after complete
        Vue.nextTick(() => {
          expect(isShow(vm.$el.querySelectorAll('.infinite-status-prompt')[1])).to.be.true;
          done();
        });
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should load results to fill up the container', (done) => {
    const expectedCount = Math.floor(vm.listContainerHeight / vm.listItemHeight);
    let i = 0;
    let timer;

    vm.onInfinite = function test() {
      setTimeout(() => {
        this.list.push(++i);
        this.$broadcast('$InfiniteLoading:loaded');
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

    vm.$mount().$appendTo('body');
  });

  it('should reset component and call onInfinite again', (done) => {
    let callCount = 0;
    vm.onInfinite = function test() {
      if (!callCount++) {
        this.$broadcast('$InfiniteLoading:reset');
      } else {
        done();
      }
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should display the custom spinner if customize it with slot', (done) => {
    vm.isCustomSpinner = true;
    vm.distance = undefined;

    vm.$mount().$appendTo('body');

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.custom-spinner')).to.be.ok;
      done();
    });
  });

  it('should load data when scroll top (direction attribute)', (done) => {
    vm.direction = 'top';
    vm.onInfinite = function test() {
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelector('.loading-default'))).to.be.true;
        done();
      });
    };

    vm.$mount().$appendTo('body');
  });
});
