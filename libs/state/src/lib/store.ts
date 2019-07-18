import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { isEqual, cloneDeep, isEmpty, get } from 'lodash';
import {
  Response,
  shouldTransformResponse,
  Config
} from '@firetask/reactive-record';

export interface StateModel {
  responses: Response[];
}

export class ResponseSync {
  public static readonly type = '[ReactiveState] Sync Response';
  constructor(public payload: Response) {}
}

export class ResponseReset {
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

  @Action(ResponseSync) syncResponse(
    context: StateContext<StateModel>,
    action: ResponseSync
  ) {
    const state = context.getState();
    let responses = cloneDeep(state.responses);
    const exists = responses.find(it => it.key === action.payload.key);

    const changed =
      exists && !isEqual(cloneDeep(exists), cloneDeep(action.payload));

    if (changed) {
      responses = [
        ...responses.filter(r => r.key !== action.payload.key),
        ...[action.payload]
      ];
    } else if (!exists) {
      responses.push(action.payload);
    }

    context.patchState({
      responses: responses
    });
  }

  @Action(ResponseReset) resetResponse(context: StateContext<StateModel>) {
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

export function state(key: string, value?: any): any {
  const shouldSetState = !isEmpty(value) || value === {} || value === [];
  if (shouldSetState && Config.store.change) Config.store.change(key, value);
  return Config.store.search ? Config.store.search(key) : {};
}

export function setState(key: string, value: any) {
  if (!value.id) throw new Error('value must contain an id property');

  const currentState: any = state(key);
  const isElastic = get(currentState, 'data.hits.hits');
  let newStateData = { ...currentState.data };

  if (isElastic) {
    const currentStateSource = currentState.data.hits.hits.find(
      h => h._source.id === value.id
    );

    const newStateHitsHits = [
      ...currentState.data.hits.hits.filter(h => h._source.id != value.id),
      ...[
        {
          ...currentStateSource,
          _source: value
        }
      ]
    ];

    const newStateHits = { ...currentState.data.hits, hits: newStateHitsHits };
    newStateData = { ...currentState.data, hits: newStateHits };
  }

  const newState = { ...currentState, data: newStateData };

  //
  // set the new state
  state(key, newState);
}
