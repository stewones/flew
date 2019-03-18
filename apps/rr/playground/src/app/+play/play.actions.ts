import {
  AddChainMethod,
  RemoveChainMethod,
  UpdateChainMethod
} from './method/method.actions';
import { UpdateChainCollection } from './collection/collection.actions';
import {
  AddCollectionResponse,
  RemoveCollectionResponses
} from './response/response.actions';

export enum PlayActionTypes {
  ADD_CHAIN_METHOD = '[Method] Add to chain',
  REMOVE_CHAIN_METHOD = '[Method] Remove from chain',
  UPDATE_CHAIN_METHOD = '[Method] Update in chain',
  UPDATE_CHAIN_COLLECTION = '[Collection] Update in chain',
  ADD_COLLECTION_RESPONSE = '[Collection] Add response',
  REMOVE_COLLECTION_RESPONSES = '[Collection] Remove responses'
}

export type PlayAction =
  | AddChainMethod
  | RemoveChainMethod
  | UpdateChainMethod
  | UpdateChainCollection
  | AddCollectionResponse
  | RemoveCollectionResponses;

// not needed for now
// export const fromPlayActions = {
//   AddChainMethod,
//   RemoveChainMethod,
//   UpdateChainMethod,
//   UpdateChainCollection
// };
