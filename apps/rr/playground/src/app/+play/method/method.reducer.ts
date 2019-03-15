import { PlayState } from '../play.reducer';

export function addMethodToSelectionReducer(
  state: PlayState,
  action
): PlayState {
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

export function removeSelectedMethodReducer(
  state: PlayState,
  action
): PlayState {
  return {
    ...state,
    selectedMethods: [
      ...state.selectedMethods.filter(it => it.name != action.payload.name)
    ]
  };
}

export function updateSelectedMethodReducer(
  state: PlayState,
  action
): PlayState {
  return {
    ...state,
    selectedMethods: state.selectedMethods.map(it =>
      it.name != action.payload.name ? it : { ...it, ...action.payload }
    )
  };
}
