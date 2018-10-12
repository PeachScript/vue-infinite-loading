import Vue from 'vue/dist/vue.common';
import InfiniteLoading from '../../../src';
import config from '../../../src/config';

describe('vue-infinite-loading:index', () => {
  const options = {
    props: { distance: 200 },
  };

  function getRunningModeFromVue() {
    return Vue.config.productionTip ? 'development' : 'production';
  }

  afterEach(() => {
    // clear component
    delete Vue.options.components['infinite-loading'];
  });

  it('should register component automatically if there has global Vue', () => {
    expect(Vue.options.components['infinite-loading']).to.not.be.undefined;
  });

  it('should register component, sync app running mode from Vue, and override config when using the plugin install API', () => {
    // assert before install
    expect(config.mode).to.equal(getRunningModeFromVue());
    expect(config.props.distance).to.not.equal(options.props.distance);

    // change running mode for Vue
    Vue.config.productionTip = true;

    // install plugin
    Vue.use(InfiniteLoading, options);

    // assert after install
    expect(config.props.distance).to.equal(options.props.distance);
    expect(config.mode).to.equal(getRunningModeFromVue());
  });
});
