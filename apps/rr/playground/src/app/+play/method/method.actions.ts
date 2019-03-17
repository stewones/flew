import { PlayActionTypes } from '../play.actions';
import { Method } from '../../interfaces/method.interface';
import { Action } from '@ngrx/store';

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
