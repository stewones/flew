import { StateContext } from '@ngxs/store';
import { PlayStateModel } from '../play.state';
import { AddLog, ClearLog } from './log.actions';

export function addLogReducer(
  context: StateContext<PlayStateModel>,
  action: AddLog
) {
  const state = context.getState();
  context.patchState({
    logs: [...state.logs, ...[action.payload]]
  });
}

export function clearLogReducer(
  context: StateContext<PlayStateModel>,
  action: ClearLog
) {
  context.patchState({
    logs: []
  });
}
