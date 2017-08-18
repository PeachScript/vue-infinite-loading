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

describe('vue-infinite-loading', () => {
  let vm; // save Vue model
  const basicConfig = {
    data: {
      list: [],
      isDivScroll: false,
      direction: 'bottom',
    },
    template: `
      <div :style="{ overflow: isDivScroll ? 'auto' : 'visible' }">
        <ul>
          <li v-for="item in list" v-text="item"></li>
        </ul>
        <infinite-loading
          :direction="direction"
          :on-infinite="onInfinite"
          ref="infiniteLoading"
          >
        </infinite-loading>
      </div>
    `,
    components: { InfiniteLoading },
    methods: {
      onInfinite() {},
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
        height: 20px;
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
        onInfinite: function onInfinite() {
          for (let i = 0, j = this.list.length; i < 3; i += 1) {
            this.list.push(j + i);
          }

          const expectedLength = this.list.length;
          const isComplete = expectedLength > 6;

          // check spinner
          expect(isShow(this.$el.querySelector('.loading-default'))).to.be.true;

          if (isComplete) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
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

  it('should not trigger load again before the last load is complete\n      (use div as the container)', (done) => {
    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [],
        isDivScroll: true,
        direction: 'bottom',
      },
      methods: {
        onInfinite: function onInfinite() {
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

  it('should works again when reset it after a completion\n      (use top direction)', (done) => {
    let calledTimes = 0;

    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [],
        isDivScroll: false,
        direction: 'top',
      },
      methods: {
        onInfinite: function onInfinite() {
          calledTimes += 1;

          if (calledTimes === 1) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            this.$nextTick(() => {
              // check no results text
              expect(isShow(this.$el.querySelectorAll('.infinite-status-prompt')[0])).to.be.true;

              // reset component
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
          } else if (calledTimes === 2) {
            // check spinner
            expect(isShow(this.$el.querySelector('.loading-default'))).to.be.true;
            done();
          }
        },
      },
    }));

    vm.$mount('#app');
  });

  it('should always load data until fill up the contianer\n      (use div as the container)', (done) => {
    let timer;

    vm = new Vue(Object.assign({}, basicConfig, {
      data: {
        list: [],
        isDivScroll: true,
        direction: 'bottom',
      },
      methods: {
        onInfinite: function onInfinite() {
          this.list.push(this.list.length + 1);
          this.$nextTick(() => {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
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

  it('should works properly with scroll plugins through the `infinite-wrapper` attribute', (done) => {
    const app = document.getElementById('app');
    const wrapper = document.createElement('div');

    app.appendChild(wrapper);
    app.setAttribute('infinite-wrapper', ''); // add `infinite-wrapper` attribute for app container
    vm = new Vue(Object.assign({}, basicConfig, {
      methods: {
        onInfinite: function onInfinite() {
          expect(this.$refs.infiniteLoading.scrollParent).to.equal(app);
          done();
        },
      },
    }));

    vm.$mount(wrapper);
  });

  it('should not works when deactivated by the `keep-alive` feature\n      (use top direction)', (done) => {
    let calledTimes = 0;
    const InfiniteView = Object.assign({}, basicConfig, {
      data() {
        return {
          list: [],
          isDivScroll: true,
          direction: 'top',
        };
      },
      methods: {
        onInfinite: function onInfinite() {
          calledTimes += 1;

          if (calledTimes === 1) {
            // change view to deactivate the component
            this.$parent.currentView = null;
            this.$nextTick(() => {
              // trigger loaded event
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
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
});
