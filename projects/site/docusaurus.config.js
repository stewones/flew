module.exports = {
  title: 'Rebased',
  tagline: 'Fetch and data management reimagined',
  url: 'https://rebased.io',
  baseUrl: '/',
  favicon: 'images/favicon.png',
  organizationName: 'rebased',
  projectName: 'rebased',
  stylesheets: [],
  themeConfig: {
    // disableDarkMode: false,
    prism: {
      theme: require('./src/js/monokaiTheme.js')
    },
    navbar: {
      title: 'Rebased',
      logo: {
        alt: 'Rebased',
        src: 'images/r.svg'
      },
      items: [
        { label: 'Get Started', to: 'get-started', position: 'right' },
        { label: 'API', to: 'core/api', position: 'right' },
        { label: 'Changelog', to: 'changelog', position: 'right' }

        // {
        //   label: 'Getting Started',
        //   to: 'getting-started',
        //   position: 'right'
        // },

        // { label: 'FAQ', to: 'faq', position: 'right' },
        // {
        //   label: 'GitHub',
        //   href: 'https://github.com/rebasedjs/rebasedjs',
        //   position: 'right'
        // },
        // {
        //   label: 'Need help?',
        //   href: 'https://github.com/rebasedjs/rebasedjs/issues',
        //   position: 'right'
        // }
      ]
    },
    footer: {
      style: 'light',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Getting Started',
      //         to: 'getting-started'
      //       }
      //     ]
      //   }
      // ],
      logo: {
        alt: 'Rebased Logo',
        src: 'images/r-trace.svg',
        href: 'https://rebased.io'
      },
      copyright: `<small><span>Copyright © ${new Date().getFullYear()}</span><br />handcrafted by <a href="https://twitter.com/stewones" rel="noopener" target="_blank">Stew</a></small>`
    },
    // algolia: {
    //   apiKey: 'asdf',
    //   indexName: 'rebased',
    //   algoliaOptions: {}
    // },
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
