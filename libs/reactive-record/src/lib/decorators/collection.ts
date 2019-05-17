import { Options } from '../interfaces/options';
import { isEmpty } from 'lodash';
import { PlatformServer } from '../platforms/server';
import { PlatformBrowser } from '../platforms/browser';
import { isServer } from '../utils/platform';

export function Collection(options: Options) {
  const useCache =
    isEmpty(options.useCache) && !isServer() && options.useCache !== false
      ? true
      : options.useCache;

  if (options.name) options.collection = options.name;
  if (!options.chain) options.chain = {};

  options.chain.useCache = options.useCache;
  delete options.useCache; // because it's part of public api

  return function(constructor: Function) {
    constructor.prototype.$collection = useCache
      ? new PlatformBrowser(options)
      : new PlatformServer(options);
  };
}
