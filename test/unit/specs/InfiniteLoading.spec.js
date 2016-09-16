import Vue from 'vue';
import InfiniteLoading from '../../../src/components/InfiniteLoading';

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
      };
    },
    render(createElement) {
      return createElement(
        'div',
        {
          style: {
            height: '100px',
            overflow: this.isDivScroll ? 'auto' : 'visible',
          },
        },
        [
          createElement('ul', this.list.map((item) => createElement('li', item))),
          this.isLoadedAll ? undefined : createElement(InfiniteLoading,
            {
              props: {
                distance: this.distance,
                onInfinite: this.onInfinite,
              },
              ref: 'infiniteLoading',
            },
            [
              this.isCustomSpinner ? createElement('span',
                {
                  slot: 'spinner',
                },
                [
                  createElement('i', {
                    attrs: {
                      class: 'custom-spinner',
                    },
                  }),
                ]
              ) : undefined,
            ]
          ),
        ]
      );
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
    vm.$refs.infiniteLoading && vm.$refs.infiniteLoading.$destroy();
    vm.$destroy(true);
    /**
     * because of pass true as the argument for destroy method cannot
     * remove element from DOM in Vue.js 2.0.0-rc6
     */
    vm.$el && vm.$el.remove();
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
      Vue.nextTick(() => {
        expect(isShow(vm.$el.querySelectorAll('.infinite-status-prompt')[1])).to.be.true;
        done();
      });
    }.bind(vm);

    vm.$mount('#app');
  });

  it('should reset component and call onInfinite again', (done) => {
    let callCount = 0;
    vm.onInfinite = function test() {
      if (!callCount++) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      } else {
        done();
      }
    }.bind(vm);

    vm.$mount('#app');
  });

  it('should display the custom spinner if customize it with slot', () => {
    vm.isCustomSpinner = true;
    delete vm.distance;
    vm.$mount('#app');

    expect(vm.$el.querySelector('.custom-spinner')).to.be.ok;
  });
});
