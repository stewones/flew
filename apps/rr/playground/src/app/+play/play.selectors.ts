import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PLAY_FEATURE_KEY, PlayState } from './play.reducer';

export const playState = createFeatureSelector<PlayState>(PLAY_FEATURE_KEY);

export const hasLoaded = createSelector(
  playState,
  (state: PlayState) => state.loaded
);

export const hasError = createSelector(
  playState,
  (state: PlayState) => state.error
);
