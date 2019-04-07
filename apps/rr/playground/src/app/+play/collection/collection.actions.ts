import { PlayActionTypes } from '../play.actions';
import { Action } from '@ngrx/store';
import { Log } from '@firetask/reactive-record';

export class UpdateChainCollection implements Action {
  readonly type = PlayActionTypes.UPDATE_CHAIN_COLLECTION;
  constructor(public payload: string) {}
}

export class AddCollectionLog implements Action {
  readonly type = PlayActionTypes.ADD_COLLECTION_LOG;
  constructor(public payload: Log) {}
}

export class ClearCollectionLog implements Action {
  readonly type = PlayActionTypes.CLEAR_COLLECTION_LOG;
  constructor() {}
}
