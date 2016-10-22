import Vue from 'vue';
import InfiniteLoading from '../../../src/components/InfiniteLoading';

function isShow(elm) {
  const styles = getComputedStyle(elm);

  return styles.getPropertyValue('display') !== 'none';
}

describe('InfiniteLoading.vue', () => {
  let vm;

  Vue.transition('bounce', { type: 'transition', afterEnter() {} });

  // create new Vue instance for every test case
  beforeEach(() => {
    vm = new Vue({
      data: {
        list: [],
        distance: 50,
        isLoadedAll: false,
        isDivScroll: true,
        isCustomSpinner: false,
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
                            v-if="!isLoadedAll">
            <span slot="spinner" v-if="isCustomSpinner"><i class="custom-spinner"></i></span>
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
      this.$nextTick(() => {
        expect(isShow(vm.$el.querySelector('.loading-default'))).to.be.true;
        done();
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should not to execute callback if the previous loading has not be completed', (done) => {
    vm.onInfinite = function test() {
      const len = this.list.length + 1;
      for (let i = len; i < len + 20; i++) {
        this.list.push(i);
      }

      this.$nextTick(() => {
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
      this.$nextTick(() => {
        expect(vm.$el.querySelector('.loading-default')).to.not.be.ok;
        done();
      });
    }.bind(vm);

    vm.$mount().$appendTo('body');
  });

  it('should display no results prompt', (done) => {
    vm.onInfinite = function test() {
      this.$broadcast('$InfiniteLoading:complete');
      this.$nextTick(() => {
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
      this.$nextTick(() => {
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

  it('should display the custom spinner if customize it with slot', () => {
    vm.isCustomSpinner = true;
    vm.distance = undefined;

    vm.$mount().$appendTo('body');

    expect(vm.$el.querySelector('.custom-spinner')).to.be.ok;
  });

  it('should working properly with transition and stagger', (done) => {
    const transitonVm = new Vue({
      data: {
        list: [],
        distance: 50,
        isLoadedAll: false,
        isDivScroll: true,
        isCustomSpinner: false,
        bounce: Vue.transition('bounce'),
        stagger: 10,
        pageItems: 20,
      },
      template: `
        <div style="height: 100px; overflow: auto;">
          <style>
            .item.bounce-transition{
              transition: all .3s;
              opacity: 1;
            }
            .item.bounce-enter, .item.bounce-leave{
              opacity: 0;
            }
          </style>
          <ul>
            <li class="item" v-for="item in list" v-text="item" transition="bounce"
                :stagger="stagger"></li>
          </ul>
          <infinite-loading :distance="distance"
                            :on-infinite="onInfinite"
                            v-if="!isLoadedAll"
                            :transition="bounce"
                            :stagger-count="list.length">
          </infinite-loading>
        </div>
      `,
      components: { InfiniteLoading },
      methods: {
        onInfinite() {
          const len = this.list.length + 1;
          for (let i = len; i < len + this.pageItems; i++) {
            this.list.push(i);
          }

          this.$nextTick(() => {
            this.$broadcast('$InfiniteLoading:loaded');

            if (this.list.length <= this.pageItems) {
              // wait for transition complete
              setTimeout(() => {
                this.$el.onscroll = () => {
                  this.$nextTick(() => {
                    // load more data when scroll after transition
                    expect(this.list.length).to.equal(this.pageItems * 2);
                    done();
                  });
                };

                // trigger scroll event manually
                this.$el.scrollTop = this.$el.scrollHeight;
              }, (this.stagger * this.pageItems) + 310);
            }
          });
        },
      },
    });

    transitonVm.$mount().$appendTo('body');
  });

  it('should reset properly with transition and stagger', (done) => {
    const transitonVm = new Vue({
      data: {
        list: [],
        distance: 50,
        isLoadedAll: false,
        isDivScroll: true,
        isCustomSpinner: false,
        bounce: Vue.transition('bounce'),
        stagger: 10,
        pageItems: 20,
      },
      template: `
        <div style="height: 100px; overflow: auto;">
          <style>
            .item.bounce-transition{
              transition: all .3s;
              opacity: 1;
            }
            .item.bounce-enter, .item.bounce-leave{
              opacity: 0;
            }
          </style>
          <ul>
            <li class="item" v-for="item in list" v-text="item" transition="bounce"
                :stagger="stagger"></li>
          </ul>
          <infinite-loading :distance="distance"
                            :on-infinite="onInfinite"
                            v-if="!isLoadedAll"
                            :transition="bounce"
                            :stagger-count="list.length">
          </infinite-loading>
        </div>
      `,
      components: { InfiniteLoading },
      ready() {
        // when the transition doesn't has hook function
        delete this.bounce.afterEnter;
      },
      methods: {
        onInfinite() {
          const len = this.list.length + 1;
          for (let i = len; i < len + this.pageItems; i++) {
            this.list.push(i);
          }
          this.$broadcast('$InfiniteLoading:loaded');

          // wait for transition complete
          setTimeout(() => {
            this.list = [];

            // item will be removed one by one, so the count of item not be 0 immediately
            expect(this.$el.querySelectorAll('ul li').length !== 0).to.be.true;

            // wait for transition complete
            setTimeout(() => {
              expect(this.$el.querySelectorAll('ul li')).to.have.lengthOf(0);
              this.$broadcast('$InfiniteLoading:reset');
              done();
            }, (this.pageItems * this.stagger) + 300);
          }, (this.pageItems * this.stagger) + 300);
        },
      },
    });

    transitonVm.$mount().$appendTo('body');
  });
});
