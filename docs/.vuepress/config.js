module.exports = {
  title: 'Vue-infinite-loading',
  locales: {
    '/': {
      description: 'An infinite scroll plugin for Vue.js',
    },
    '/zh/': {
      description: '一款用于 Vue.js 的无限滚动插件',
    },
  },
  themeConfig: {
    sidebar: 'auto',
    repo: 'https://github.com/PeachScript/vue-infinite-loading',
    locales: {
      '/': {
        lang: 'en-US',
        selectText: 'Languages',
        label: 'English',
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'API',
            link: '/api/',
          },
        ],
        sidebar: {
          '/guide/': [
            '',
            'start-with-hn',
            'use-with-filter-or-tabs',
          ],
        },
        footer: `
<p>
  Released under the
  <a target="_blank" href="https://github.com/PeachScript/vue-infinite-loading/blob/master/LICENSE">MIT License</a>
  |
  Powered by
  <a target="_blank" href="https://vuepress.vuejs.org">VuePress</a>
</p>
<p>
  &copy;2016-present Made with ♥ by
  <a target="_blank" href="https://www.peachis.me">PeachScript</a>
</p>
`,
      },
      '/zh/': {
        lang: 'zh-CN',
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          {
            text: '指南',
            link: '/zh/guide/',
          },
          {
            text: 'API',
            link: '/zh/api/',
          },
        ],
        sidebar: {
          '/zh/guide/': [
            '',
            'start-with-hn',
            'use-with-filter-or-tabs',
          ],
        },
        footer: `
<p>
  遵循
  <a target="_blank" href="https://github.com/PeachScript/vue-infinite-loading/blob/master/LICENSE">MIT 开源协议</a>
  |
  由
  <a target="_blank" href="https://vuepress.vuejs.org">VuePress</a>
  强力驱动
</p>
<p>
  &copy;2016-present Made with ♥ by
  <a target="_blank" href="https://www.peachis.me">PeachScript</a>
</p>
`,
      },
    },
  },
  plugins: [require('@vuepress/theme-default/index')],
};
