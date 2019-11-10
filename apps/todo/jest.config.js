module.exports = {
  name: 'todo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/todo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
