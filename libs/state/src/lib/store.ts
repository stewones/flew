import { State as Store, Action, StateContext } from '@ngxs/store';
import {
  get,
  isFunction,
  isObject,
  cloneDeep,
  set,
  isArray,
  isEmpty,
  isEqual
} from 'lodash';
import { Reative, Response, shouldTransformResponse } from '@reative/records';
import { Observable, from, of } from 'rxjs';
import { STATE_GLOBAL_NAMESPACE } from './config';

export interface StateModel {
  [key: string]: Response;
}

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

export const defaultStateOptions: SetStateOptions = {
  merge: true,
  save: true,
  path: 'data',
  identifier: Reative.options.identifier
};

@Store<StateModel>({
  name: STATE_GLOBAL_NAMESPACE,
  defaults: {}
})
export class State {
  @Action(StateSync) syncResponse(
    context: StateContext<StateModel>,
    action: StateSync
  ) {
    const key: string = get(action, 'payload.key');
    if (!key) return;
    const state = context.getState();
    const newState: any = {
      ...state,
      ...{
        [key]: action.payload
      }
    };

    context.setState(newState);
  }

  @Action(StateReset) resetResponse(context: StateContext<StateModel>) {
    context.setState({});
  }

  constructor() {}
}

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

export function syncState(data: Response) {
  return Reative.store.sync(data);
}

export function getState<T = any>(
  key: string,
  options: GetStateOptions = { raw: false, mutable: false }
): T {
  const response = Reative.store.get && Reative.store.get(key);
  const transform: any = shouldTransformResponse(
    { transformData: !options.raw },
    response
  );
  return options.mutable
    ? cloneDeep(transform(response) as T)
    : (transform(response) as T);
}

export function getState$<T = any>(
  key: string,
  options: GetStateOptions = { raw: false, feed: true }
): Observable<T> {
  const responseFromState = Reative.store.get && Reative.store.get(key);
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
            .get(key)
            .then(responseFromCache => {
              const transformFromCache: any = shouldTransformResponse(
                { transformData: !options.raw },
                responseFromCache
              );
              const response = transformFromCache(responseFromCache) as T;
              if (responseFromCache && options.feed) addState(key, response);
              resolve(response);
            })
            .catch(err => reject(err));
        })
      ) as Observable<T>);
}

export function addState(key: string, value: any) {
  const currentState = getState(key);
  if (!isEqual(currentState, value)) {
    setState(key, { data: value }, { merge: false });
  }
}

export function setState(
  key: string,
  value: any,
  options: SetStateOptions = {}
) {
  options = { ...defaultStateOptions, ...options };
  const currentState: any = cloneDeep(getState(key, { raw: true })) || {};
  const isElastic = get(currentState, 'data.hits.hits');
  let newState = options.merge
    ? { ...currentState, data: value, key: key }
    : { ...value, key: key };

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
        let newStateHasItem = currentStatePath.find(
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

  const stateBefore = getState(key, { raw: true }) || {};

  if (isEqual(stateBefore, newState)) return;

  //
  // set cache
  if (Reative.storage && options.save) {
    try {
      Reative.storage.set(key, newState);
    } catch (err) {}
  }

  //
  // set state
  Reative.store.set(key, newState);
}

/**
 * method to load state from cache into store
 */
export async function feedState(key?: string) {
  const hasStorage = isFunction(Reative.storage.forEach);
  if (hasStorage) {
    if (key) {
      const cache = await Reative.storage.get(key);
      if (!isEmpty(cache)) Reative.store.sync(cache);
      return cache;
    } else {
      return Reative.storage.forEach((value, k, index) =>
        Reative.store.sync(value)
      );
    }
  }
  throw new Error(`Can't locate storage instance`);
}
