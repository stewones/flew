export function todo(
  state = {
    view: {},
    list: [],
    loading: false,
    error: null
  },
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'LOADING_TODO':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOADING_TODOS':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOADING_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'ADD_TODO_LIST':
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null
      };
    case 'ADD_TODO_VIEW':
      return {
        ...state,
        view: action.payload,
        loading: false,
        error: null
      };

    default:
      return state;
  }
}
