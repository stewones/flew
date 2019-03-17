import {
  AddChainMethod,
  RemoveChainMethod,
  UpdateChainMethod
} from './method/method.actions';
import { UpdateChainCollection } from './collection/collection.actions';

export enum PlayActionTypes {
  ADD_CHAIN_METHOD = '[Methods] Add method to chain',
  REMOVE_CHAIN_METHOD = '[Methods] Remove method from chain',
  UPDATE_CHAIN_METHOD = '[Methods] Update method in chain',
  UPDATE_CHAIN_COLLECTION = '[Collections] Update collection in chain'
}

export type PlayAction =
  | AddChainMethod
  | RemoveChainMethod
  | UpdateChainMethod
  | UpdateChainCollection;

// not needed for now
// export const fromPlayActions = {
//   AddChainMethod,
//   RemoveChainMethod,
//   UpdateChainMethod,
//   UpdateChainCollection
// };
