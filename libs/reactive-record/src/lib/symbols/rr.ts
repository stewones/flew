import { Options } from '../interfaces/options';
import { Subject } from 'rxjs';

interface ReactiveOptions {
  options: Options;
  store?: any;
}

const ReactiveConfig: ReactiveOptions = {
  options: {
    driver: 'firestore'
  },
  store: {
    dispatch: new Subject()
  }
};

export const optionGet = function() {
  return ReactiveConfig.options;
};

export const optionSet = function(options: Options) {
  return (ReactiveConfig.options = options);
};

export const storeGet = function() {
  return ReactiveConfig.store;
};

export const storeSet = function(store) {
  return (ReactiveConfig.store = store);
};

Object.defineProperty(ReactiveConfig, 'o', {
  get: optionGet,
  set: optionSet
});

Object.defineProperty(ReactiveConfig, 's', {
  get: storeGet,
  set: storeSet
});

export const Config = ReactiveConfig;

export function key(name: string, data?: boolean) {
  return (state: any) => {
    const response = state.ReactiveState.responses.find(it => it.key === name);
    return response && data && response.data ? response.data : response;
  };
}
