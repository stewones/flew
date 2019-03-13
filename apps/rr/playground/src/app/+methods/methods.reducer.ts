import { MethodsAction, MethodsActionTypes } from './methods.actions';

export const METHODS_FEATURE_KEY = 'methods';

export interface Method {
  name: string;
  description: string;
  type: 'boolean' | 'responseCallback';
  default: string;
  platform: Array<'browser' | 'server'>;
}

export interface MethodsState {
  list: Method[]; // list of Methods; analogous to a sql normalized table
  selectedId?: string | number; // which Methods record has been selected
  loaded: boolean; // has the Methods list been loaded
  error?: any; // last none error (if any)
}

export interface MethodsPartialState {
  readonly [METHODS_FEATURE_KEY]: MethodsState;
}

export const initialState: MethodsState = {
  loaded: true,
  list: [
    {
      name: 'useNetwork',
      description: ' force the use of network call',
      type: 'boolean',
      default: 'true',
      platform: ['browser', 'server']
    },
    {
      name: 'useCache',
      description:
        'when true the first response should be from the cache if exists',
      type: 'boolean',
      default: 'true',
      platform: ['browser']
    }
  ]
};

export function methodsReducer(
  state: MethodsState = initialState,
  action: MethodsAction
): MethodsState {
  switch (action.type) {
    case MethodsActionTypes.MethodsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
