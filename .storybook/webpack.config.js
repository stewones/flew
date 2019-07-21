module.exports = function({ config }) {
  config.module.rules.push({
    test: /.story.ts$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' }
      }
    ],
    enforce: 'pre',
    include: require('path').resolve(__dirname, '../apps/firetask')
  });
  if (process.env.NODE_ENV !== `test`) {
    config.node = { fs: 'empty' };
  }
  return config;
};
