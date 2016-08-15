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
        path: '/custom-messages',
        name: 'customMessages',
        label: 'Custom messages',
      },
      {
        path: '/with-tabs',
        name: 'withTabs',
        label: 'Use with tabs',
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
    name: 'slots',
    label: 'Slots',
  },
];

export { routes };
