import { Options } from '../interfaces/options';

interface ReactiveOptions {
  options: Options;
  store?: any;
}

const ReactiveConfig: ReactiveOptions = {
  options: {
    driver: 'firestore'
  },
  store: {
    dispatch: () => {}
  }
};

Object.defineProperty(ReactiveConfig, 'o', {
  get: function() {
    return ReactiveConfig.options;
  },
  set: function(options: Options) {
    return (ReactiveConfig.options = options);
  }
});

Object.defineProperty(ReactiveConfig, 's', {
  get: function() {
    return ReactiveConfig.store;
  },
  set: function(store) {
    return (ReactiveConfig.store = store);
  }
});

export const Config = ReactiveConfig;

export function key(name: string, data?: boolean) {
  return (state: any) => {
    const response = state.ReactiveState.responses.find(it => it.key === name);
    return response && data && response.data ? response.data : response;
  };
}
