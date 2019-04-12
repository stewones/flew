import {
  State,
  Action,
  StateContext,
  Selector,
  createSelector
} from '@ngxs/store';
import { Response } from '../interfaces/response';

export interface StateModel {
  responses: Response[];
}

export class SyncReactiveResponse {
  public static readonly type = '[ReactiveState] Sync Response';
  constructor(public payload: Response) {}
}

@State<StateModel>({
  name: 'ReactiveRecord',
  defaults: {
    responses: []
  }
})
export class ReactiveState {
  @Action(SyncReactiveResponse) addResponse(
    context: StateContext<StateModel>,
    action: SyncReactiveResponse
  ) {
    const state = context.getState();
    const responses = state.responses;
    let exists = responses.find(it => it.key === action.payload.key);
    if (exists) exists = { ...exists, ...action.payload };

    const result = !exists
      ? [...responses, ...[action.payload]]
      : [...responses];

    context.patchState({
      responses: result
    });
  }

  static key(name: string) {
    return createSelector(
      [ReactiveState],
      (state: StateModel) => {
        return state.responses.find(it => it.key === name);
      }
    );
  }
  constructor() {}
}
