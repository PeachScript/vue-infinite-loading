module.exports = {
  title: 'Vue-infinite-loading',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
  ],
  base: '/vue-infinite-loading/',
  ga: 'UA-128069695-1',
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
    repo: '/PeachScript/vue-infinite-loading',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        lang: 'en-US',
        selectText: 'Languages',
        label: 'English',
        lastUpdated: true,
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'API',
            link: '/api/',
          },
          {
            text: 'Old Version',
            link: 'https://peachscript.github.io/vue-infinite-loading/old/',
          },
          {
            text: 'Changelog',
            link: 'https://github.com/PeachScript/vue-infinite-loading/releases',
          },
        ],
        sidebar: {
          '/guide/': [
            '',
            'start-with-hn',
            'use-with-filter-or-tabs',
            'top-dir-scroll',
            'use-with-el-table',
            'configure-load-msg',
            'configure-plugin-opts',
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
        lastUpdated: '上次更新',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          {
            text: '指南',
            link: '/zh/guide/',
          },
          {
            text: 'API',
            link: '/zh/api/',
          },
          {
            text: '旧版文档',
            link: 'https://peachscript.github.io/vue-infinite-loading/old/',
          },
          {
            text: '更新日志',
            link: 'https://github.com/PeachScript/vue-infinite-loading/releases',
          },
        ],
        sidebar: {
          '/zh/guide/': [
            '',
            'start-with-hn',
            'use-with-filter-or-tabs',
            'top-dir-scroll',
            'use-with-el-table',
            'configure-load-msg',
            'configure-plugin-opts',
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
  plugins: [
    require('@vuepress/theme-default/index'),
    '@vuepress/google-analytics'
  ],
};
