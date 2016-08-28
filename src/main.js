import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import hljs from 'highlight.js';
import app from './App';
import { configRouter } from './route';

require('./styles/main.less');

Vue.use(VueRouter);
Vue.use(VueResource);

function highlightBlock() {
  hljs.highlightBlock(this.el);
}

Vue.directive('highlightjs', highlightBlock);

const App = Vue.extend(app);
const router = new VueRouter();

configRouter(router);
router.start(App, 'app');

Vue.config.debug = process.env.NODE_ENV !== 'production';

if (window.location.search) {
  window.location.href = window.location.href.split('?')[0];
}
