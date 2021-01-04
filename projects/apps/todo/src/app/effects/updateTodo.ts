import { fetch } from '@rebased/core';
import { getState } from '@rebased/state';
import { Todo } from '../interfaces/todo';

export function updateTodo(todo: Todo) {
  return fetch(`Todo`)
    .from(getState('control.from'))
    .doc(todo.doc_id)
    .update(todo);
}
