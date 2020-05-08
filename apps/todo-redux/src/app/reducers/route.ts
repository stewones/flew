export function route(
  state = {
    pathname: null,
    loading: false
  },
  action: { type: string; pathname: any }
) {
  switch (action.type) {
    case 'NAVIGATE_TO':
      return {
        ...state,
        loading: true,
        pathname: action.pathname
      };
    case 'NAVIGATE_END':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
