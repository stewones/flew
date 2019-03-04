module.exports = {
  name: 'reactive-record',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/reactive-record',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
