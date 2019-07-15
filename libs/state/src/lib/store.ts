import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { isEqual, cloneDeep, merge } from 'lodash';
import { Response, shouldTransformResponse } from '@firetask/reactive-record';

export interface StateModel {
  responses: Response[];
}

export class ReactiveResponseSync {
  public static readonly type = '[ReactiveState] Sync Response';
  constructor(public payload: Response) {}
}

export class ReactiveResponseReset {
  public static readonly type = '[ReactiveState] Reset Responses';
  constructor() {}
}

@State<StateModel>({
  name: 'ReactiveState',
  defaults: {
    responses: []
  }
})
export class ReactiveState {
  static key(name: string, data = true) {
    return createSelector(
      [ReactiveState],
      // @dynamic
      (state: StateModel) => {
        const response = state.responses.find(it => it.key === name);

        const transformResponse: any = shouldTransformResponse(
          { transformData: data },
          response
        );
        return response && transformResponse(response);
      }
    );
  }

  @Action(ReactiveResponseSync) syncResponse(
    context: StateContext<StateModel>,
    action: ReactiveResponseSync
  ) {
    const state = context.getState();
    const responses = cloneDeep(state.responses);
    const exists = responses.find(it => it.key === action.payload.key);

    const changed =
      exists && !isEqual(cloneDeep(exists), cloneDeep(action.payload));

    if (changed) {
      merge(exists, action.payload);
    } else if (!exists) {
      responses.push(action.payload);
    }

    context.patchState({
      responses: responses
    });
  }

  @Action(ReactiveResponseReset) resetResponse(
    context: StateContext<StateModel>
  ) {
    context.patchState({
      responses: []
    });
  }

  constructor() {}
}

export function key(name: string, data = true) {
  return (state: any) => {
    const response = state.ReactiveState.responses.find(it => it.key === name);
    const transformResponse: any = shouldTransformResponse(
      { transformData: data },
      response
    );
    return response && transformResponse(response);
  };
}
