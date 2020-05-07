export function todo(
  state = {
    list: [],
    editing: false
  },
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'ADD_TODO_LIST':
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}
