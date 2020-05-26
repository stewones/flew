import { Todo } from '../interfaces/todo';
import { setTodo } from '../effects/setTodo';
import { addTodoError } from './addTodoError';
import { navigateTo } from './navigateTo';
import { loadingTodo } from './loadingTodo';

export function createTodo(todo: Todo) {
  return function(dispatch) {
    // just a flag to be logged in state
    dispatch(loadingTodo(todo));
    // execute "side effect"
    setTodo(todo).subscribe(
      () => dispatch(navigateTo(`/edit/${todo.doc_id}`)),
      error => dispatch(addTodoError(error))
    );
  };
}
