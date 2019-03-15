import { Action } from '@ngrx/store';
import { Method } from '../interfaces/method.interface';

export enum PlayActionTypes {
  ADD_CHAIN_METHOD = '[Methods] Add method to chain',
  REMOVE_CHAIN_METHOD = '[Methods] Remove method from chain',
  UPDATE_CHAIN_METHOD = '[Methods] Update method in chain'
}

export class AddChainMethod implements Action {
  readonly type = PlayActionTypes.ADD_CHAIN_METHOD;
  constructor(public payload: Method) {}
}
export class RemoveChainMethod implements Action {
  readonly type = PlayActionTypes.REMOVE_CHAIN_METHOD;
  constructor(public payload: Method) {}
}
export class UpdateChainMethod implements Action {
  readonly type = PlayActionTypes.UPDATE_CHAIN_METHOD;
  constructor(public payload: Method) {}
}

export type PlayAction = AddChainMethod | RemoveChainMethod | UpdateChainMethod;

export const fromPlayActions = {
  AddChainMethod,
  RemoveChainMethod,
  UpdateChainMethod
};
