import { RROptions } from '../interfaces/rr-options';
import { isEmpty } from 'lodash';
import { PlatformServer } from '../platforms/server';
import { PlatformBrowser } from '../platforms/browser';
declare var module;

export function Collection(options: RROptions) {
  const isServer = typeof module !== 'undefined' && module.exports;
  const useCache =
    isEmpty(options.useCache) && !isServer && options.useCache !== false
      ? true
      : options.useCache;

  options.useCache = useCache;
  if (options.name) options.collection = options.name;

  return function(constructor: Function) {
    constructor.prototype.$collection = useCache
      ? new PlatformBrowser(options)
      : new PlatformServer(options);
  };
}
