import { findTodos } from '../effects/findTodos';
import { addTodoList } from './addTodoList';

export function getTodos() {
  return function(dispatch) {
    // execute a "side effect" to obtain a list of todos and then dispatch to the store
    // in this particular case we don't need to unsubscribe because reative already does that internally
    findTodos().subscribe(it => dispatch(addTodoList(it)));
  };
}
