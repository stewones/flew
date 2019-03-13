import { PlayAction, PlayActionTypes } from './play.actions';
import { Method } from '../interfaces/method.interface';

export const PLAY_FEATURE_KEY = 'play';

export interface PlayState {
  list: Method[]; // list of Play; analogous to a sql normalized table
  selectedId?: string | number; // which Play record has been selected
  loaded: boolean; // has the Play list been loaded
  error?: any; // last none error (if any)
}

export interface PlayPartialState {
  readonly [PLAY_FEATURE_KEY]: PlayState;
}

export const initialState: PlayState = {
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
export function playReducer(
  state: PlayState = initialState,
  action: PlayAction
): PlayState {
  switch (action.type) {
    case PlayActionTypes.PlayLoaded: {
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
