import { fetch } from '@flew/network';
import { getState } from '@flew/state';
import { Todo } from '../interfaces/todo';

export function updateTodo(todo: Todo) {
  return fetch(`Todo`)
    .from(getState('control.from'))
    .doc(todo.doc_id)
    .update(todo);
}
