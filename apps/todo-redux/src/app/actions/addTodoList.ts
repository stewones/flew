import { Todo } from '../interfaces/todo';

export function addTodoList(todos: Todo[]) {
  return {
    type: 'ADD_TODO_LIST',
    payload: todos
  };
}
