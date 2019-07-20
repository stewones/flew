module.exports = {
  name: 'records',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/records',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
