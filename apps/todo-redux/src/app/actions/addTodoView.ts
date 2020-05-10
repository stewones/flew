import { Todo } from '../interfaces/todo';

export function addTodoView(todo: Todo) {
  return {
    type: 'ADD_TODO_VIEW',
    payload: todo
  };
}
