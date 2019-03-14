import { PlayState } from '../play.reducer';

export function addMethodReducer(state: PlayState, action): PlayState {
  const exists = state.selectedMethods.find(
    it => it.name === action.payload.name
  );
  const selectedMethods = exists
    ? [...state.selectedMethods]
    : [...state.selectedMethods, ...[action.payload]];
  return {
    ...state,
    selectedMethods: selectedMethods
  };
}
