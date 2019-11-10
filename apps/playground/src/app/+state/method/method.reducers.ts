import { StateContext } from '@ngxs/store';
import { PlayStateModel } from '../play.state';
import {
  AddMethod,
  RemoveMethod,
  UpdateMethod,
  UpdateVerb
} from './method.actions';

export function addMethodReducer(
  context: StateContext<PlayStateModel>,
  action: AddMethod
) {
  const state = context.getState();
  const exists = state.selectedMethods.find(
    it => it.name === action.payload.name
  );
  const selectedMethods = exists
    ? [...state.selectedMethods]
    : [...state.selectedMethods, ...[action.payload]];

  context.patchState({
    selectedMethods: selectedMethods
  });
}

export function removeMethodReducer(
  context: StateContext<PlayStateModel>,
  action: RemoveMethod
) {
  const state = context.getState();
  context.patchState({
    selectedMethods: [
      ...state.selectedMethods.filter(it => it.name != action.payload.name)
    ]
  });
}

export function updateMethodReducer(
  context: StateContext<PlayStateModel>,
  action: UpdateMethod
) {
  const state = context.getState();
  context.patchState({
    selectedMethods: state.selectedMethods.map(it =>
      it.name != action.payload.name ? it : { ...it, ...action.payload }
    )
  });
}

export function updateVerbReducer(
  context: StateContext<PlayStateModel>,
  action: UpdateVerb
) {
  context.patchState({
    selectedVerb: action.payload
  });
}
