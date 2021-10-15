module.exports = {
  name: 'counter-redux',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/counter-redux',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
