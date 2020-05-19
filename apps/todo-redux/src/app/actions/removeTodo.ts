import { removeState, getState } from '@reative/state';
import { addTodoError } from './addTodoError';
import { addTodoView } from './addTodoView';
import { Todo } from '../interfaces/todo';
import { deleteTodo } from '../effects/deleteTodo';
import { navigateTo } from './navigateTo';
import { findTodoKey } from '../effects/findTodoKey';

export function removeTodo(todo: Todo) {
  //
  // side effect of deleting one todo
  const resetStateAndCache = () => removeState(findTodoKey(todo.doc_id));

  return function(dispatch) {
    //
    // just a flag to be logged in state
    dispatch({
      type: `DELETING_TODO`,
      payload: todo
    });
    //
    // execute delete effect
    deleteTodo(todo).subscribe(
      todo =>
        dispatch(addTodoView({})) &&
        dispatch(navigateTo(`/`)) &&
        resetStateAndCache(),
      error => dispatch(addTodoError(error))
    );
  };
}
