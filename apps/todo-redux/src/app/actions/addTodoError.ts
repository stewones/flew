export function addTodoError(error) {
  console.error(error);
  return {
    type: 'ADD_TODO_ERROR',
    payload: error
  };
}
