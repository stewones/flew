import { Options } from '../interfaces/options';

let ReactiveConfig: { options: Options; store?: any } = {
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
