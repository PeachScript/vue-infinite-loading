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
      },
      template: `
        <div style="height: 100px;"
            :style="{
              overflow: isDivScroll ? 'auto' : 'visible'
            }">
          <ul>
            <li v-for="item in list" v-text="item"></li>
          </ul>
          <infinite-loading :distance="distance"
                            :on-infinite="onInfinite"
                            v-if="!isLoadedAll"></infinite-loading>
        </div>
      `,
      components: { InfiniteLoading },
      methods: {},
    });
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should render correct template', () => {
    vm.isDivScroll = false;
    vm.distance = undefined;

    vm.$mount().$appendTo('body');

    expect(vm.$el.querySelector('.loading-default')).to.be.ok;
  });

  it('should appear a loading animation', (done) => {
    vm.onInfinite = function test() {
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelector('.loading-default'))).to.be.true;

        this.$broadcast('$InfiniteLoading:loaded');

        Vue.nextTick(() => {
          expect(isShow(vm.$el.querySelector('.loading-default'))).to.be.false;
          done();
        });
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should only load once', (done) => {
    vm.onInfinite = function test() {
      const length = this.list.length + 1;
      for (let i = length; i < length + 20; i++) {
        this.list.push(i);
      }

      Vue.nextTick(() => {
        if (this.list.length === 20) {
          vm.$el.addEventListener('scroll', () => {
            expect(this.list).to.have.lengthOf(20);
            done();
          });

          // trigger scroll event
          vm.$el.scrollTop = vm.$el.scrollHeight;
        }
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should be destroyed completely', (done) => {
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
      this.$broadcast('$InfiniteLoading:complete');
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelectorAll('.infinite-status-prompt')[0])).to.be.true;
        done();
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should display no more data prompt', (done) => {
    vm.onInfinite = function test() {
      this.$broadcast('$InfiniteLoading:loaded');
      this.$broadcast('$InfiniteLoading:complete');
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelectorAll('.infinite-status-prompt')[1])).to.be.true;
        done();
      });
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
});
