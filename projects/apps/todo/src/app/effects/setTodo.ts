import { entry } from '@rebased/core';
import { getState } from '@rebased/state';
import { Todo } from '../interfaces/todo';

export function setTodo(todo: Todo) {
  return entry(`Todo`)
    .driver(getState('control.driver'))
    .set(todo);
}
