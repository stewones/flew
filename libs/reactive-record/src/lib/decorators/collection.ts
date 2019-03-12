import { Options } from '../interfaces/options';
import { isEmpty } from 'lodash';
import { PlatformServer } from '../platforms/server';
import { PlatformBrowser } from '../platforms/browser';
declare var module;

export function Collection(options: Options) {
  const isServer = typeof module !== 'undefined' && module.exports;
  const useCache =
    isEmpty(options.useCache) && !isServer && options.useCache !== false
      ? true
      : options.useCache;

  if (options.name) options.collection = options.name;
  delete options.useCache; // @todo make a test for this

  return function(constructor: Function) {
    constructor.prototype.$collection = useCache
      ? new PlatformBrowser(options)
      : new PlatformServer(options);
  };
}
