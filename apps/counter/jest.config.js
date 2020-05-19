module.exports = {
  name: 'counter',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/counter',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
