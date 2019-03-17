import { PlayState } from '../play.reducer';
// import { Collection } from '../../interfaces/collection.interface';

// export function removeSelectedCollectionReducer(
//   state: PlayState,
//   action
// ): PlayState {
//   return {
//     ...state,
//     selectedCollection: <Collection>{}
//   };
// }

export function updateSelectedCollectionReducer(
  state: PlayState,
  action
): PlayState {
  const collection = state.collections.find(c => c.service === action.payload);
  return {
    ...state,
    selectedCollection: collection ? collection : state.selectedCollection
  };
}
