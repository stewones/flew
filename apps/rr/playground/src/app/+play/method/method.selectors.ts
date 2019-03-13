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

// const getSelectedMethod = createSelector(
//   getAllPlay,
//   getSelectedId,
//   (play, id) => {
//     const result = play.find(it => it['id'] === id);
//     return result ? Object.assign({}, result) : undefined;
//   }
// );
