import { routes } from './config';

const components = require.context('./components', false, /^\.\/.*\.vue$/);
const routerMap = {};

function capitalize(str) {
  return str.replace(/^\w/, str[0].toUpperCase());
}

routes.forEach((route) => {
  routerMap[route.path] = {
    name: route.name,
    component: components(`./${capitalize(route.name)}.vue`),
  };
  (route.navs || []).forEach((nav) => {
    routerMap[`${route.path}${nav.path}`] = {
      name: nav.name,
      component: components(`./${capitalize(route.name)}.vue`),
    };
  });
});

export function configRouter(router) {
  router.map(routerMap);
}
