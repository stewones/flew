import { StateContext } from '@ngxs/store';
import { PlayStateModel } from '../play.state';
import { UpdateCollection } from './collection.actions';

export function updateCollectionReducer(
  context: StateContext<PlayStateModel>,
  action: UpdateCollection
) {
  const state = context.getState();
  const collection = state.collections.find(c => c.service === action.payload);
  context.patchState({
    selectedCollection: collection ? collection : state.selectedCollection
  });
}
