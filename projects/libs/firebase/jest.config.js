module.exports = {
  name: 'fire',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/fire',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
