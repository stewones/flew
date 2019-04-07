import { createSelector } from '@ngrx/store';
import { PlayState } from '../play.reducer';
import { playState, hasLoaded } from '../play.selectors';

export const getAllCollections = createSelector(
  playState,
  hasLoaded,
  (state: PlayState, isLoaded) => {
    return isLoaded ? state.collections : [];
  }
);

export const getSelectedCollection = createSelector(
  playState,
  (state: PlayState) => state.selectedCollection
);

export const getSelectedPlatform = createSelector(
  playState,
  (state: PlayState) => state.selectedPlatform
);

export const getLogs = createSelector(
  playState,
  (state: PlayState) => state.logs
);
