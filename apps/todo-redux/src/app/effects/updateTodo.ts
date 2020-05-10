import { collection } from '@reative/core';
import { getState } from '@reative/state';
import { Todo } from '../interfaces/todo';

export function updateTodo(todo: Todo) {
  return todo.id
    ? collection(`Todo`)
        .driver(getState('control.driver'))
        .doc(todo.id)
        .update(todo)
    : collection(`Todo`)
        .driver(getState('control.driver'))
        .set(todo);
}
