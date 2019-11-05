module.exports = {
  name: 'rr-parse',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/rr/parse',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
