import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue Composable Observer',
  description: 'Observe, inspect and debug Vue composables at runtime',
  base: '/vue-composable-observer/',

  head: [
    ['link', { rel: 'icon', href: '/vue-composable-observer/favicon.svg', type: 'image/svg+xml' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      {
        text: 'Changelog',
        link: 'https://github.com/runtime-labs/vue-composable-observer/releases',
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'How it works', link: '/guide/how-it-works' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'API Reference', link: '/api/' },
        ],
      },
      {
        text: 'More',
        items: [
          { text: 'FAQ', link: '/guide/faq' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/runtime-labs/vue-composable-observer' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Runtime Labs',
    },

    editLink: {
      pattern: 'https://github.com/runtime-labs/vue-composable-observer/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },
  },
})
