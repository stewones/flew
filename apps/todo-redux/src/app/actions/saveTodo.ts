import { Todo } from '../interfaces/todo';
import { updateTodo } from '../effects/updateTodo';
import { addTodoError } from './addTodoError';
import { addTodoView } from './addTodoView';

export function saveTodo(todo: Todo) {
  return function(dispatch) {
    //
    // just a flag to be logged in state
    dispatch({
      type: `SAVING_TODO`,
      payload: todo
    });
    // execute "side effect"
    updateTodo(todo).subscribe(
      () =>
        dispatch({
          type: `TODO_SAVED`,
          payload: todo
        }),
      error => dispatch(addTodoError(error))
    );
  };
}
