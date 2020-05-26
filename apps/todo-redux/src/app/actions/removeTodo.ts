import { unsetState } from '@reative/state';
import { addTodoError } from './addTodoError';
import { addTodoView } from './addTodoView';
import { Todo } from '../interfaces/todo';
import { deleteTodo } from '../effects/deleteTodo';
import { navigateTo } from './navigateTo';
import { findTodoKey } from '../effects/findTodoKey';
import { deletingTodo } from './deletingTodo';

export function removeTodo(todo: Todo) {
  //
  // side effect of deleting one todo
  const resetStateAndCache = () => unsetState(findTodoKey(todo.doc_id));

  return function(dispatch) {
    //
    // just a flag to be logged in state
    dispatch(deletingTodo());
    //
    // execute delete effect
    deleteTodo(todo).subscribe(
      () =>
        dispatch(addTodoView({})) &&
        dispatch(navigateTo(`/`)) &&
        resetStateAndCache(),
      error => dispatch(addTodoError(error))
    );
  };
}
