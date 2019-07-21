import { State as Store, Action, StateContext } from '@ngxs/store';
import { get, isFunction, isObject } from 'lodash';
import { Reactive, Response, shouldTransformResponse } from '@reactive/records';
import { Observable } from 'rxjs';

export interface StateModel {
  Records: Response[];
}

export interface SetStateOptions {
  merge?: boolean;
  save?: boolean;
}

export interface GetStateOptions {
  raw?: boolean;
}

export class ResponseSync {
  public static readonly type = '[State] Sync Response';
  constructor(public payload: Response) {}
}

export class ResponseReset {
  public static readonly type = '[State] Reset Responses';
  constructor() {}
}

@Store<StateModel>({
  name: 'Reactive',
  defaults: {
    Records: []
  }
})
export class State {
  @Action(ResponseSync) syncResponse(
    context: StateContext<StateModel>,
    action: ResponseSync
  ) {
    const state = context.getState();
    const responses = [...state.Records];
    const exists = responses.find(it => it.key === action.payload.key);

    if (!exists) {
      responses.push(action.payload);
    }

    context.setState({
      Records: exists
        ? Object.assign(responses, {
            [responses.indexOf(exists)]: action.payload
          })
        : responses
    });
  }

  @Action(ResponseReset) resetResponse(context: StateContext<StateModel>) {
    context.setState({
      Records: []
    });
  }

  constructor() {}
}

export function key(name: string, data = true) {
  return (state: any) => {
    const response = state.Reactive.Records.find(it => it.key === name);
    const transform: any = shouldTransformResponse(
      { transformData: data },
      response
    );
    return response && transform(response);
  };
}

export function select<T>(key: string, data?) {
  return Reactive.store.select(key, data) as Observable<T>;
}

export function enabledState() {
  return Reactive.store.enabled;
}

export function resetState() {
  return Reactive.store.reset();
}

export function syncState(data: Response) {
  return Reactive.store.sync(data);
}

export function getState(
  key: string,
  options: GetStateOptions = { raw: false }
): any {
  const response = Reactive.store.get && Reactive.store.get(key);
  const transform: any = shouldTransformResponse(
    { transformData: !options.raw },
    response
  );
  return transform(response);
}

export function setState(
  key: string,
  value: any,
  options: SetStateOptions = { merge: true, save: true }
) {
  const currentState: any = getState(key, { raw: true }) || {};
  const isElastic = get(currentState, 'data.hits.hits');
  let newState = options.merge
    ? { ...currentState, data: value }
    : { ...value };

  //
  // elastic case
  // for a given object
  if (options.merge && isElastic && isObject(value)) {
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

    const newStateHits = {
      ...currentState.data.hits,
      hits: newStateHitsHits
    };
    const newStateData = { ...currentState.data, hits: newStateHits };
    newState = { ...currentState, data: newStateData };
  }

  //
  // set the new state
  if (Reactive.storage && options.save) Reactive.storage.set(key, newState);
  return Reactive.store.set && Reactive.store.set(key, newState);
}

/**
 * method to fully load entries from cache into store
 * make sure to call this only once
 */
export function feedState() {
  const hasStorage = isFunction(Reactive.storage.forEach);
  if (hasStorage)
    return Reactive.storage.forEach((value, key, index) =>
      Reactive.store.sync(value)
    );
  throw new Error(
    `Can't locate storage instance. Did you try to call feedState inside the AppModule constructor?`
  );
}
