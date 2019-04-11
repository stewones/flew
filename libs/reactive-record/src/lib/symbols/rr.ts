import { Options } from '../interfaces/options';

let ReactiveRecordConfig: { options: Options } = {
  options: {
    driver: 'firestore'
  }
};

Object.defineProperty(ReactiveRecordConfig, 'ReactiveRecordConfig', {
  get: function() {
    return ReactiveRecordConfig.options;
  },
  set: function(options: Options) {
    return (ReactiveRecordConfig.options = options);
  }
});

export const Config = ReactiveRecordConfig;
