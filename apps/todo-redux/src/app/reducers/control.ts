import { THE_CAT_API_SEARCH } from '../configs/cat';

export function control(
  state = {
    driver: 'firestore',
    pathname: THE_CAT_API_SEARCH,
    useMemo: true,
    useCache: true,
    useNetwork: true,
    simulateHttpError: false
  },
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'CONTROL_USE_MEMO':
      return {
        ...state,
        useMemo: action.payload
      };
    case 'CONTROL_USE_CACHE':
      return {
        ...state,
        useCache: action.payload
      };
    case 'CONTROL_USE_NETWORK':
      return {
        ...state,
        useNetwork: action.payload
      };
    case 'CONTROL_SIMULATE_HTTP_ERROR':
      return {
        ...state,
        simulateHttpError: action.payload
      };
    case 'CONTROL_DRIVER':
      return {
        ...state,
        driver: action.payload
      };
    case 'CONTROL_PATHNAME':
      return {
        ...state,
        pathname: action.payload
      };
    default:
      return state;
  }
}
