module.exports = {
  name: 'rr-demo',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/rr/demo/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
