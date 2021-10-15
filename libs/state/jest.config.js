module.exports = {
  name: 'state',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/state',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
