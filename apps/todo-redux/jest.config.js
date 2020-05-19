module.exports = {
  name: 'todo-redux',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/todo-redux',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
