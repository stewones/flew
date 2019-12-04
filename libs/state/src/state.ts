import { Reative, Response, shouldTransformResponse } from '@reative/core';
import {
  cloneDeep,
  get,
  isArray,
  isEmpty,
  isEqual,
  isFunction,
  isObject,
  set
} from 'lodash';
import { from, Observable, of } from 'rxjs';

export const STATE_GLOBAL_NAMESPACE = `Records`;

export interface SetStateOptions {
  merge?: boolean;
  save?: boolean;
  path?: string;
  identifier?: string;
}
export interface GetStateOptions {
  raw?: boolean;
  mutable?: boolean;
  feed?: boolean;
}

export class StateSync {
  public static readonly type = `[${STATE_GLOBAL_NAMESPACE}] Sync State`;
  constructor(public payload: Response) {}
}

export class StateReset {
  public static readonly type = `[${STATE_GLOBAL_NAMESPACE}] Reset State`;
  constructor() {}
}

export interface StateModel {
  [key: string]: Response;
}

export const defaultStateOptions: SetStateOptions = {
  merge: true,
  save: true,
  path: 'data',
  identifier: Reative.options.identifier
};

export function key(name: string, raw = false) {
  return (state: any) => {
    const response = state[STATE_GLOBAL_NAMESPACE][name];
    const transform: any = shouldTransformResponse(
      { transformData: !raw },
      response
    );
    return response && transform(response);
  };
}

export function select<T>(key: string, raw?: boolean) {
  return Reative.store.select(key, raw) as Observable<T>;
}

export function enabledState() {
  return Reative.store.enabled;
}

export function resetState() {
  return Reative.store.reset();
}

export function resetStateResponse(context) {
  context.setState({});
}

export function syncState(data: Response) {
  return Reative.store.sync(data);
}

export function getState<T = any>(
  stateKey: string,
  options: GetStateOptions = { raw: false, mutable: false }
): T {
  const response = Reative.store.get && Reative.store.get(stateKey);
  const transform: any = shouldTransformResponse(
    { transformData: !options.raw },
    response
  );
  return options.mutable
    ? cloneDeep(transform(response) as T)
    : (transform(response) as T);
}

export function getState$<T = any>(
  stateKey: string,
  options: GetStateOptions = { raw: false, feed: true }
): Observable<T> {
  const responseFromState = Reative.store.get && Reative.store.get(stateKey);
  const transformFromState: any = shouldTransformResponse(
    { transformData: !options.raw },
    responseFromState
  );
  const state = responseFromState
    ? transformFromState(responseFromState)
    : null;

  return state
    ? of(state)
    : (from(
        new Promise((resolve, reject) => {
          Reative.storage
            .get(stateKey)
            .then(responseFromCache => {
              const transformFromCache: any = shouldTransformResponse(
                { transformData: !options.raw },
                responseFromCache
              );
              const response = transformFromCache(responseFromCache) as T;
              if (responseFromCache && options.feed)
                addState(stateKey, response);
              resolve(response);
            })
            .catch(err => reject(err));
        })
      ) as Observable<T>);
}

export function addState(stateKey: string, value: any) {
  const currentState = getState(stateKey);
  if (!isEqual(currentState, value)) {
    setState(stateKey, { data: value }, { merge: false });
  }
}

export function addStateResponse(context, action) {
  const stateKey: string = get(action, 'payload.key');
  if (!stateKey) return;
  const state = context.getState();
  const newState: any = {
    ...state,
    ...{
      [stateKey]: action.payload
    }
  };

  context.setState(newState);
}

export function setState(
  stateKey: string,
  value: any,
  options: SetStateOptions = { identifier: Reative.options.identifier }
) {
  options = { ...defaultStateOptions, ...options };
  const currentState: any = cloneDeep(getState(stateKey, { raw: true })) || {};
  const isElastic = get(currentState, 'data.hits.hits');
  let newState = options.merge
    ? { ...currentState, data: value, key: stateKey }
    : { ...value, key: stateKey };

  //
  // elastic case
  // for a given object
  if (isElastic) {
    if (options.merge && isObject(value)) {
      const currentStateSource = currentState.data.hits.hits.find(
        h => h._source.id === value[options.identifier]
      );

      let newStateHitsHits = [];
      if (!isEmpty(currentStateSource)) {
        currentState.data.hits.hits[
          currentState.data.hits.hits.indexOf(currentStateSource)
        ] = {
          ...currentStateSource,
          _source: {
            ...currentStateSource._source,
            ...value
          }
        };
        newStateHitsHits = [...currentState.data.hits.hits];
      } else {
        newStateHitsHits = [
          ...currentState.data.hits.hits,
          ...[
            {
              _source: value
            }
          ]
        ];
      }

      const newStateHits = {
        ...currentState.data.hits,
        hits: newStateHitsHits
      };
      const newStateData = { ...currentState.data, hits: newStateHits };
      newState = { ...currentState, data: newStateData };
    }
  } else {
    //
    // natural case
    if (options.merge) {
      //
      // for a given object
      // merge by identifier
      let currentStatePath = cloneDeep(get(currentState, options.path));
      const currentStatePathIsEmpty = isEmpty(currentStatePath);

      if (currentStatePathIsEmpty) currentStatePath = [];

      if (isObject(value) && isArray(currentStatePath)) {
        const newStateHasItem = currentStatePath.find(
          item => item[options.identifier] === value[options.identifier]
        );
        let newStateData = [];
        if (!isEmpty(newStateHasItem)) {
          currentStatePath[
            currentStatePath.indexOf(newStateHasItem)
          ] = Object.assign({}, newStateHasItem, value);
          newStateData = [...currentStatePath];
        } else {
          newStateData = [...currentStatePath, ...[value]];
        }

        const currentState_ = cloneDeep(currentState);
        set(currentState_, options.path, newStateData);

        newState = { ...currentState_ };
      }

      //
      // for a given array
      if (isArray(value) && isArray(currentStatePath)) {
        const newStateData = [...currentStatePath, ...value];

        const currentState_ = cloneDeep(currentState);
        set(currentState_, options.path, newStateData);

        newState = { ...currentState_ };
      }
    }
  }

  const stateBefore = getState(stateKey, { raw: true }) || {};

  if (isEqual(stateBefore, newState)) return;

  //
  // set cache
  if (Reative.storage && options.save) {
    try {
      Reative.storage.set(stateKey, newState);
    } catch (err) {}
  }

  //
  // set state
  Reative.store.set(stateKey, newState);
}

export async function feedState(stateKey?: string) {
  const hasStorage = isFunction(Reative.storage.forEach);

  if (hasStorage) {
    if (key) {
      const cache = await Reative.storage.get(stateKey);
      if (!isEmpty(cache)) Reative.store.sync(cache);
      return cache;
    } else {
      return Reative.storage.forEach((value, k, index) => {
        Reative.store.sync(value);
      });
    }
  }
  throw new Error(`Can't locate storage instance`);
}

export function install(instance) {
  Reative.store.enabled = true;
  Reative.store.reset = () => instance.dispatch(new StateReset());
  Reative.store.sync = r => {
    instance.dispatch(new StateSync(r));
  };

  Reative.store.get = stateKey => {
    const snapshot = instance.snapshot();
    const state = get(snapshot, `${STATE_GLOBAL_NAMESPACE}.${stateKey}`) || {};
    return state;
  };

  Reative.store.set = (stateKey, val) => {
    const newState = { ...val, key: stateKey };
    instance.dispatch(new StateSync(newState));
  };

  Reative.store.select = (stateKey, raw?) => {
    return instance.select(key(stateKey, raw));
  };

  Reative.store.addState = addState;
  Reative.store.getState = getState;
  Reative.store.setState = setState;
}
