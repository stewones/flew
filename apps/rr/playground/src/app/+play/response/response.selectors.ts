import { createSelector } from '@ngrx/store';
import { PlayState } from '../play.reducer';
import { playState, hasLoaded } from '../play.selectors';

export const getAllCollectionResponses = createSelector(
  playState,
  hasLoaded,
  (state: PlayState, isLoaded) => {
    return isLoaded ? state.responses : [];
  }
);
