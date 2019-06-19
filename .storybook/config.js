import { configure, addDecorator } from '@storybook/angular';
import { withOptions } from '@storybook/addon-options';
import { configureViewport } from '@storybook/addon-viewport';
// import initStoryshots from '@storybook/addon-storyshots';
// import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const req = require.context('../', true, /.story.ts$/);

addDecorator(
  withOptions({
    /**
     * name to display in the top left corner
     * @type {String}
     */
    name: 'Firetask',
    /**
     * URL for name in top left corner to link to
     * @type {String}
     */
    url: '#',
    // more options at https://github.com/storybooks/storybook/tree/next/addons/options
    // more info at https://medium.com/storybookjs/announcing-storybook-3-4-db4d1341dedd
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/
  }),
  configureViewport()
  // initStoryshots({
  //   suite: 'Image storyshots',
  //   test: imageSnapshot({ storybookUrl: 'http://127.0.0.1:8887' })
  // })
);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);

// import { configure } from '@storybook/angular';

// // automatically import all files ending in *.stories.ts
// const req = require.context('../src/stories', true, /\.stories\.ts$/);
// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

// configure(loadStories, module);
