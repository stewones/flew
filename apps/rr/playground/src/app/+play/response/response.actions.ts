import { PlayActionTypes } from '../play.actions';
import { Action } from '@ngrx/store';
import { PlayResponse } from '../../interfaces/play.interface';

export class AddCollectionResponse implements Action {
  readonly type = PlayActionTypes.ADD_COLLECTION_RESPONSE;
  constructor(public payload: PlayResponse) {}
}

export class RemoveCollectionResponses implements Action {
  readonly type = PlayActionTypes.REMOVE_COLLECTION_RESPONSES;
  constructor() {}
}
