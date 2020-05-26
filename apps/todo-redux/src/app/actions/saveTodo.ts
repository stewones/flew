import { Todo } from '../interfaces/todo';
import { updateTodo } from '../effects/updateTodo';
import { addTodoError } from './addTodoError';
import { addTodoView } from './addTodoView';
import { savingTodo } from './savingTodo';

export function saveTodo(todo: Todo) {
  return function(dispatch) {
    // just a flag to be logged in state
    dispatch(savingTodo(todo));
    // execute "side effect"
    updateTodo(todo).subscribe(
      () => dispatch(addTodoView(todo)),
      error => dispatch(addTodoError(error))
    );
  };
}
