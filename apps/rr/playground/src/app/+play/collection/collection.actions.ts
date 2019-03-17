import { PlayActionTypes } from '../play.actions';
import { Action } from '@ngrx/store';

export class UpdateChainCollection implements Action {
  readonly type = PlayActionTypes.UPDATE_CHAIN_COLLECTION;
  constructor(public payload: string) {}
}
