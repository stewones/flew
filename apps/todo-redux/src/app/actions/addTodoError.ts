export function addTodoError(error) {
  console.error(error);
  return {
    type: 'LOADING_ERROR',
    payload: error
  };
}
