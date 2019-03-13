import { MethodsAction, MethodsActionTypes } from './methods.actions';

export const METHODS_FEATURE_KEY = 'methods';

export interface Method {
  name: string;
  description: string;
  type: 'boolean' | 'responseCallback';
  default: string;
  platform: Array<'browser' | 'server'>;
}

export interface MethodState {
  list: Method[]; // list of Methods; analogous to a sql normalized table
  selectedId?: string | number; // which Methods record has been selected
  loaded: boolean; // has the Methods list been loaded
  error?: any; // last none error (if any)
}

export interface MethodPartialState {
  readonly [METHODS_FEATURE_KEY]: MethodState;
}

export const initialState: MethodState = {
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

export function reducer(
  state: MethodState = initialState,
  action: MethodsAction
) {
  switch (action.type) {
    case MethodsActionTypes.MethodsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }

    // case MethodsActionTypes.MethodsLoaded: {
    //   state = {
    //     ...state,
    //     list: action.payload,
    //     loaded: true
    //   };
    //   break;
    // }
  }
  return state;
}
