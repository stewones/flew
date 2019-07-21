module.exports = {
  name: 'ionic',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/cache',
  transformIgnorePatterns: ['node_modules/(?!@ionic)']
};
