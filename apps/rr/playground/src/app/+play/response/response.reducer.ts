import { PlayState } from '../play.reducer';

export function addResponseToSelectionReducer(
  state: PlayState,
  action
): PlayState {
  return {
    ...state,
    responses: [...state.responses, ...action.payload]
  };
}

export function removeAllResponsesReducer(state: PlayState, action): PlayState {
  return {
    ...state,
    responses: []
  };
}
