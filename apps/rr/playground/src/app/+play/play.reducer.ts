import { PlayAction, PlayActionTypes } from './play.actions';
import { Method } from '../interfaces/method.interface';
import {
  addMethodToSelectionReducer,
  removeSelectedMethodReducer,
  updateSelectedMethodReducer
} from './method/method.reducer';

export const PLAY_FEATURE_KEY = 'play';

export interface PlayState {
  methods: Method[]; // list of Play; analogous to a sql normalized table
  selectedMethods?: Method[]; // which Play record has been selected
  loaded: boolean; // has the Play list been loaded
  error?: any; // last none error (if any)
}

export interface PlayPartialState {
  readonly [PLAY_FEATURE_KEY]: PlayState;
}

export const initialState: PlayState = {
  loaded: true,
  selectedMethods: [],
  methods: [
    {
      name: 'useNetwork',
      placeholder: 'Use network?',
      description: 'force the use of network call',
      default: 'true',
      platform: ['browser', 'server'],
      type: 'boolean',
      value: 'true'
    },
    {
      name: 'useCache',
      placeholder: 'Use cache?',
      description:
        'when true the first response should be from the cache if exists',
      default: 'true',
      platform: ['browser'],
      type: 'boolean',
      value: 'true'
    },
    {
      name: 'transformNetwork',
      placeholder: 'Transform Network',
      description: 'a callback function to transform the network response',
      default: 'response',
      platform: ['browser'],
      type: 'callback',
      value: `(response: Response) => {
    // do whatever with response
    return response;
}`
    }
  ]
};

export function playReducer(
  state: PlayState = initialState,
  action: PlayAction
): PlayState {
  switch (action.type) {
    case PlayActionTypes.ADD_CHAIN_METHOD: {
      state = addMethodToSelectionReducer(state, action);
      break;
    }
    case PlayActionTypes.REMOVE_CHAIN_METHOD: {
      state = removeSelectedMethodReducer(state, action);
      break;
    }
    case PlayActionTypes.UPDATE_CHAIN_METHOD: {
      state = updateSelectedMethodReducer(state, action);
      break;
    }
  }
  return state;
}
