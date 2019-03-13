module.exports = {
  name: 'rr-playground',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/rr/playground/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
