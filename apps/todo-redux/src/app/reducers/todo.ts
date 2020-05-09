export function todo(
  state = {
    list: [],
    loading: false,
    error: null
  },
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'ADD_TODO_LOAD':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'ADD_TODO_LIST':
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null
      };
    case 'ADD_TODO_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
