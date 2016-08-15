import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './App';
import { configRouter } from './route';

require('./styles/main.less');

Vue.use(VueRouter);

const App = Vue.extend(app);
const router = new VueRouter();

configRouter(router);
router.start(App, 'app');

Vue.config.debug = process.env.NODE_ENV !== 'production';

export { App };
