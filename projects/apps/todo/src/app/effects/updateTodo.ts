import { collection } from '@rebased/core';
import { getState } from '@rebased/state';
import { Todo } from '../interfaces/todo';

export function updateTodo(todo: Todo) {
  return collection(`Todo`)
    .driver(getState('control.driver'))
    .doc(todo.doc_id)
    .update(todo);
}
