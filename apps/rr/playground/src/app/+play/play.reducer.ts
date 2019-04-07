import { PlayAction, PlayActionTypes } from './play.actions';
import { PlayMethod } from '../interfaces/method.interface';
import {
  addMethodToSelectionReducer,
  removeSelectedMethodReducer,
  updateSelectedMethodReducer,
  updateSelectedVerbReducer,
  removeAllSelectedMethodsReducer
} from './method/method.reducer';
import { PlayCollection } from '../interfaces/collection.interface';
import {
  updateSelectedCollectionReducer,
  addCollectionLogReducer,
  clearCollectionLogReducer
} from './collection/collection.reducer';
import { PlayResponse, PlayPlatform } from '../interfaces/play.interface';
import {
  addResponseToSelectionReducer,
  removeAllResponsesReducer
} from './response/response.reducer';
import { PlayMethods } from '../constants/method';
import { PlayCollections } from '../constants/collection';
import { Log } from '@firetask/reactive-record';

export const PLAY_FEATURE_KEY = 'play';

export interface PlayState {
  collections: PlayCollection[];
  selectedCollection: PlayCollection;
  methods: PlayMethod[];
  selectedMethods?: PlayMethod[];
  responses?: PlayResponse[];
  logs?: Log[];
  selectedVerb: PlayMethod;
  selectedPlatform: PlayPlatform;
  loaded: boolean;
  error?: any;
}

export interface PlayPartialState {
  readonly [PLAY_FEATURE_KEY]: PlayState;
}

export const initialState: PlayState = {
  loaded: true,
  selectedCollection: PlayCollections[0],
  collections: PlayCollections,
  selectedMethods: [],
  responses: [],
  logs: [],
  methods: PlayMethods,
  selectedVerb: PlayMethods.find(it => it.name === 'get'),
  selectedPlatform: 'browser'
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
    case PlayActionTypes.ADD_COLLECTION_RESPONSE: {
      state = addResponseToSelectionReducer(state, action);
      break;
    }
    case PlayActionTypes.REMOVE_COLLECTION_RESPONSES: {
      state = removeAllResponsesReducer(state, action);
      break;
    }
    case PlayActionTypes.UPDATE_CHAIN_VERB: {
      state = updateSelectedVerbReducer(state, action);
      break;
    }
    case PlayActionTypes.REMOVE_ALL_CHAIN_METHODS: {
      state = removeAllSelectedMethodsReducer(state, action);
      break;
    }
    case PlayActionTypes.ADD_COLLECTION_LOG: {
      state = addCollectionLogReducer(state, action);
      break;
    }
    case PlayActionTypes.CLEAR_COLLECTION_LOG: {
      state = clearCollectionLogReducer(state);
      break;
    }
  }
  return state;
}
