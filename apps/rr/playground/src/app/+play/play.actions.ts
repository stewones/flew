import {
  AddChainMethod,
  RemoveChainMethod,
  UpdateChainMethod,
  UpdateChainVerb
} from './method/method.actions';
import { UpdateChainCollection } from './collection/collection.actions';
import {
  AddCollectionResponse,
  RemoveCollectionResponses,
  LoadCollectionCachedResponses,
  ClearCollectionCachedResponses
} from './response/response.actions';

export enum PlayActionTypes {
  ADD_CHAIN_METHOD = '[Method] Add to chain',
  REMOVE_CHAIN_METHOD = '[Method] Remove from chain',
  UPDATE_CHAIN_METHOD = '[Method] Update in chain',
  UPDATE_CHAIN_COLLECTION = '[Collection] Update in chain',
  UPDATE_CHAIN_VERB = '[Verb] Update in chain',
  ADD_COLLECTION_RESPONSE = '[Collection] Add response',
  REMOVE_COLLECTION_RESPONSES = '[Collection] Remove responses',
  LOAD_COLLECTION_CACHED_RESPONSES = '[Collection] Load cached responses',
  CLEAR_COLLECTION_CACHED_RESPONSES = '[Collection] Clear cached responses'
}

export type PlayAction =
  | AddChainMethod
  | RemoveChainMethod
  | UpdateChainMethod
  | UpdateChainCollection
  | AddCollectionResponse
  | RemoveCollectionResponses
  | UpdateChainVerb
  | LoadCollectionCachedResponses
  | ClearCollectionCachedResponses;
