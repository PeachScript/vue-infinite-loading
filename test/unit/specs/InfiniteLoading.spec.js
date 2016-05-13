import Vue from 'vue';
import InfiniteLoading from '../../../src/components/InfiniteLoading';

describe('InfiniteLoading.vue', () => {
  let vm;

  // create new Vue instance for every test case
  beforeEach(() => {
    if (vm) {
      vm.$destroy();
    }

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

  it('should render correct template', () => {
    vm.isDivScroll = false;
    vm.distance = undefined;

    vm.$mount().$appendTo('body');

    expect(vm.$el.querySelector('.icon-loading')).to.be.ok;
  });

  it('should appear a loading animation', (done) => {
    vm.onInfinite = function test() {
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('.icon-loading')
                     .getAttribute('style')
                     .indexOf('display: none') === -1)
              .to.be.true;

        this.$broadcast('$InfiniteLoading:loaded');

        Vue.nextTick(() => {
          expect(vm.$el.querySelector('.icon-loading')
                       .getAttribute('style')
                       .indexOf('display: none') >= -1)
                .to.be.true;
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
        expect(vm.$el.querySelector('.icon-loading')).to.not.be.ok;
        done();
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });
});
