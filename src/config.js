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
];

module.exports = {
  routes,
};
