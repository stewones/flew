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
        {
          label: 'Github',
          to: 'https://github.com/rebasedjs/rebasedjs',
          position: 'right',
          external: true
        }

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
  ],
  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        // whether to index docs pages
        indexDocs: true,
        // must start with "/" and correspond to the routeBasePath configured for the docs plugin
        // use "/" if you use docs-only-mode
        // (see https://v2.docusaurus.io/docs/2.0.0-alpha.70/docs-introduction#docs-only-mode)
        docsRouteBasePath: '/docs',

        // Whether to also index the titles of the parent categories in the sidebar of a doc page.
        // 0 disables this feature.
        // 1 indexes the direct parent category in the sidebar of a doc page
        // 2 indexes up to two nested parent categories of a doc page
        // 3...
        //
        // Do _not_ use Infinity, the value must be a JSON-serializable integer.
        indexDocSidebarParentCategories: 2,

        // whether to index blog pages
        indexBlog: false,
        // must start with "/" and correspond to the routeBasePath configured for the blog plugin
        // use "/" if you use blog-only-mode
        // (see https://v2.docusaurus.io/docs/2.0.0-alpha.70/blog#blog-only-mode)
        blogRouteBasePath: '/blog',

        // whether to index static pages
        // /404.html is never indexed
        indexPages: true,

        // language of your documentation, see next section
        language: 'en',

        // lunr.js-specific settings
        lunr: {
          // When indexing your documents, their content is split into "tokens".
          // Text entered into the search box is also tokenized.
          // This setting configures the separator used to determine where to split the text into tokens.
          // By default, it splits the text at whitespace and dashes.
          //
          // Note: Does not work for "ja" and "th" languages, since these use a different tokenizer.
          tokenizerSeparator: /[\s\-]+/
        }
      }
    ]
  ]
};
