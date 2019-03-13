import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PLAY_FEATURE_KEY, PlayState } from './play.reducer';

// Lookup the 'Play' feature state managed by NgRx
const getPlayState = createFeatureSelector<PlayState>(PLAY_FEATURE_KEY);

const getLoaded = createSelector(
  getPlayState,
  (state: PlayState) => state.loaded
);
const getError = createSelector(
  getPlayState,
  (state: PlayState) => state.error
);

const getAllPlay = createSelector(
  getPlayState,
  getLoaded,
  (state: PlayState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getPlayState,
  (state: PlayState) => state.selectedId
);
const getSelectedPlay = createSelector(
  getAllPlay,
  getSelectedId,
  (play, id) => {
    const result = play.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const playQuery = {
  getLoaded,
  getError,
  getAllPlay,
  getSelectedPlay
};
