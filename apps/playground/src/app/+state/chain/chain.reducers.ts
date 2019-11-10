import { StateContext } from '@ngxs/store';
import { PlayStateModel } from '../play.state';
import { ClearChain } from './chain.actions';

export function clearChainReducer(
  context: StateContext<PlayStateModel>,
  action: ClearChain
) {
  context.patchState({
    selectedMethods: []
  });
}
