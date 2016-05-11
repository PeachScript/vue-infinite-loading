import Vue from 'vue';
import InfiniteLoading from '../../../src/components/InfiniteLoading';

describe('InfiniteLoading.vue', () => {
  it('should render loading icon', () => {
    const vm = new Vue({
      template: `
        <div>
          <infinite-loading></infinite-loading>
        </div>
      `,
      components: { InfiniteLoading },
    }).$mount().$appendTo('body');

    expect(vm.$el.querySelector('.icon-loading')).to.be.ok;
  });

  it('should render a fake list', (done) => {
    const vm = new Vue({
      data: {
        list: [1, 2, 3, 4, 5],
        distance: 50,
      },
      template: `
        <div style="overflow: auto; height: 500px;">
          <ul>
            <li v-for="item in list" v-text="item"></li>
          </ul>
          <infinite-loading :distance="distance" :on-infinite="onInfinite"></infinite-loading>
        </div>
      `,
      components: { InfiniteLoading },
      methods: {
        onInfinite() {
          for (let i = 6; i <= 10; i++) {
            this.list.push(i);
          }

          Vue.nextTick(() => {
            expect(vm.$el.querySelectorAll('ul li')).to.have.lengthOf(10);
            done();
          });
        },
      },
    }).$mount().$appendTo('body');
  });

  it('should stop loading animation', (done) => {
    const vm = new Vue({
      data: {
        list: [],
      },
      template: `
        <div style="overflow: auto; height: 500px;">
          <ul>
            <li v-for="item in list" v-text="item"></li>
          </ul>
          <infinite-loading :on-infinite="onInfinite"></infinite-loading>
        </div>
      `,
      components: { InfiniteLoading },
      methods: {
        onInfinite() {
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
        },
      },
    }).$mount().$appendTo('body');
  });

  it('should be destroyed', (done) => {
    const vm = new Vue({
      data: {
        list: [],
        isLoadedAll: false,
      },
      template: `
        <div style="overflow: auto; height: 500px;">
          <ul>
            <li v-for="item in list" v-text="item"></li>
          </ul>
          <infinite-loading :on-infinite="onInfinite" v-if="!isLoadedAll"></infinite-loading>
        </div>
      `,
      components: { InfiniteLoading },
      methods: {
        onInfinite() {
          this.isLoadedAll = true;
          Vue.nextTick(() => {
            expect(vm.$el.querySelector('.icon-loading')).to.not.be.ok;
            done();
          });
        },
      },
    }).$mount().$appendTo('body');
  });
});
