import { findTodos } from '../effects/findTodos';
import { addTodoList } from './addTodoList';
import { addTodoError } from './addTodoError';
import { TodoFindOptions } from '../interfaces/todoFindOptions';
import { loadingTodos } from './loadingTodos';

export function getTodos(options: TodoFindOptions) {
  return function(dispatch) {
    //
    // just a flag to be logged in state
    dispatch(loadingTodos());
    // execute a "side effect" to obtain a list of todos and then dispatch to the store
    // in this particular case we don't need to unsubscribe because reative already does that internally
    return findTodos(options).subscribe(
      todos => dispatch(addTodoList(todos)),
      error => dispatch(addTodoError(error))
    );
  };
}
