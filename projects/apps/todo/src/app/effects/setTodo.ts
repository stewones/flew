import { fetch } from '@rebased/core';
import { getState } from '@rebased/state';
import { Todo } from '../interfaces/todo';

export function setTodo(todo: Todo) {
  return fetch(`Todo`)
    .from(getState('control.from'))
    .set(todo);
}
