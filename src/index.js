import InfiniteLoading from './components/InfiniteLoading.vue';

export default InfiniteLoading;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('infinite-loading', InfiniteLoading);
}
