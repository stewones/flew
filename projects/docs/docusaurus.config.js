module.exports = {
  title: 'Rebased',
  tagline: 'Powerful toolchain for building javascript applications',
  url: 'https://rebased.app',
  baseUrl: '/',
  favicon: 'images/favicon.png',
  organizationName: 'rebased',
  projectName: 'rebased',
  stylesheets: [],
  themeConfig: {
    disableDarkMode: false,
    prism: {
      theme: require('./src/js/monokaiTheme.js')
    },
    navbar: {
      title: 'Rebased',
      image: 'images/r.svg',
      logo: {
        alt: 'Rebased',
        src: 'images/r.svg'
      },
      links: [
        {
          label: 'Getting Started',
          to: 'getting-started',
          position: 'right'
        },
        { label: 'API', to: 'core/api', position: 'right' },
        { label: 'FAQ', to: 'faq', position: 'right' },
        {
          label: 'GitHub',
          href: 'https://github.com/rebasedjs/rebasedjs',
          position: 'right'
        },
        {
          label: 'Need help?',
          href: 'https://github.com/rebasedjs/rebasedjs/issues',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'getting-started'
            }
          ]
        }
      ],
      logo: {
        alt: 'Rebased Logo',
        src: 'images/r.svg',
        href: 'https://rebased.app'
      },
      copyright: `<small><span>Copyright © 2016–${new Date().getFullYear()}</span><br />handcrafted by <a href="https://twitter.com/StewanSilva" rel="noopener" target="_blank">Stew</a></small>`
    },
    algolia: {
      apiKey: 'asdf',
      indexName: 'rebased',
      algoliaOptions: {}
    },
    googleAnalytics: {
      trackingID: 'UA-xxx-1'
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../../docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
