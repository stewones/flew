import { PlayAction, PlayActionTypes } from './play.actions';
import { Method } from '../interfaces/method.interface';
import {
  addMethodToSelectionReducer,
  removeSelectedMethodReducer,
  updateSelectedMethodReducer
} from './method/method.reducer';
import { Collection } from '../interfaces/collection.interface';
import { updateSelectedCollectionReducer } from './collection/collection.reducer';

export const PLAY_FEATURE_KEY = 'play';

export interface PlayState {
  collections: Collection[];
  selectedCollection: Collection;
  methods: Method[];
  selectedMethods?: Method[];
  loaded: boolean;
  error?: any;
}

export interface PlayPartialState {
  readonly [PLAY_FEATURE_KEY]: PlayState;
}

export const Collections: Collection[] = [
  { name: 'Users', service: 'UserService' },
  { name: 'Albums', service: 'AlbumService' },
  { name: 'Comments', service: 'CommentService' },
  { name: 'Photos', service: 'PhotoService' },
  { name: 'Todos', service: 'TodoService' }
];

export const initialState: PlayState = {
  loaded: true,
  selectedCollection: Collections[0],
  collections: Collections,
  selectedMethods: [],
  methods: [
    {
      name: 'useNetwork',
      placeholder: 'Use Network',
      description: 'force the use of network call',
      default: 'true',
      platform: ['browser', 'server'],
      type: 'boolean',
      value: 'true'
    },
    {
      name: 'useCache',
      placeholder: 'Use Cache',
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
    // do whatever with the response
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
    case PlayActionTypes.UPDATE_CHAIN_COLLECTION: {
      state = updateSelectedCollectionReducer(state, action);
      break;
    }
  }
  return state;
}
