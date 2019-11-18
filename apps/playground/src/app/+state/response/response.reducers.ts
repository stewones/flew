import { StateContext } from '@ngxs/store';
import { PlayStateModel } from '../play.state';
import { AddResponse, ClearResponse } from './response.actions';

export function addResponseReducer(
  context: StateContext<PlayStateModel>,
  action: AddResponse
) {
  const state = context.getState();
  context.patchState({
    responses: [...state.responses, ...[action.payload]]
  });
}

export function clearResponseReducer(
  context: StateContext<PlayStateModel>,
  action: ClearResponse
) {
  context.patchState({
    responses: []
  });
}
