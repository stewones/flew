module.exports = {
  name: 'reactive-record-demo',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/reactive-record/demo/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
