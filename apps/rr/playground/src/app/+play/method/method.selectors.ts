import { createSelector } from '@ngrx/store';
import { PlayState } from '../play.reducer';
import { playState, hasLoaded } from '../play.selectors';

export const getAllMethods = createSelector(
  playState,
  hasLoaded,
  (state: PlayState, isLoaded) => {
    return isLoaded ? state.methods : [];
  }
);

export const getSelectedMethods = createSelector(
  playState,
  (state: PlayState) => state.selectedMethods
);
