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
      default: 'true',
      platform: ['browser', 'server'],
      type: 'boolean'
    },
    {
      name: 'useCache',
      description:
        'when true the first response should be from the cache if exists',
      default: 'true',
      platform: ['browser'],
      type: 'callback'
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
