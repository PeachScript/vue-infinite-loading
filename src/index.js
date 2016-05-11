import InfiniteLoading from './components/InfiniteLoading';

export default InfiniteLoading;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('infinite-loading', InfiniteLoading);
}
