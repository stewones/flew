module.exports = {
  name: 'parse-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/parse-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
