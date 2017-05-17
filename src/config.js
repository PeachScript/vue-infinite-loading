const routes = [
  {
    path: '/installation',
    name: 'installation',
    label: 'Installation',
  },
  {
    path: '/getting-started',
    name: 'gettingStarted',
    label: 'Getting started',
    abstract: true,
    navs: [
      {
        path: '/basic',
        name: 'basicUse',
        label: 'Basic use',
      },
      {
        path: '/hacker-news',
        name: 'hackerNews',
        label: 'Hacker News',
      },
      {
        path: '/with-filter',
        name: 'withFilter',
        label: 'Use with filter',
      },
      {
        path: '/server-side-rendering',
        name: 'serverSideRendering',
        label: 'Server-Side Rendering',
        version: 2,
      },
      {
        path: '/with-3rd-party-scroll-plugin',
        name: 'With3rdPartyScrollPlugin',
        label: '3rd-Party Scroll Plugin',
        version: 2.1,
      },
    ],
  },
  {
    path: '/properties',
    name: 'properties',
    label: 'Properties',
  },
  {
    path: '/events',
    name: 'events',
    label: 'Events',
  },
  {
    path: '/slots',
    name: 'slots',
    label: 'Slots',
  },
  {
    path: '/spinners',
    name: 'spinners',
    label: 'Spinners',
    version: 1,
  },
];

module.exports = {
  routes,
};
