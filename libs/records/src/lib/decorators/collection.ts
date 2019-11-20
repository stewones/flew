import { Options } from '../interfaces/options';
import { isEmpty, isBoolean } from 'lodash';
import { isServer } from '../utils/platform';
import { PlatformServer } from '../platforms/server';
import { PlatformBrowser } from '../platforms/browser';

/**
 * Collection Decorator
 *
 * @export
 * @param {Options} options
 * @returns
 */
export function Collection(options: Options) {
  const params = init(options);
  return function(constructor: Function) {
    constructor.prototype.$collection = isServer()
      ? new PlatformServer(params)
      : new PlatformBrowser(params);
  };
}

/**
 * Collection Pure Function
 *
 * @export
 * @param {string} name
 * @param {Options} options
 * @returns
 */
export function collection(name: string, options: Options = {}) {
  options.name = name;
  const params = init(options);
  return isServer() ? new PlatformServer(params) : new PlatformBrowser(params);
}

/**
 * Options Initializer
 *
 * @param {Options} options
 * @returns {Options}
 */
function init(options: Options): Options {
  const useCache = isServer()
    ? false
    : isBoolean(options.useCache)
    ? options.useCache
    : true;

  const useState = isServer()
    ? false
    : isBoolean(options.useState)
    ? options.useState
    : true;

  const useNetwork = isServer()
    ? true
    : isBoolean(options.useNetwork)
    ? options.useNetwork
    : true;

  const saveNetwork = isServer()
    ? false
    : isBoolean(options.saveNetwork)
    ? options.saveNetwork
    : true;

  if (options.name) options.collection = options.name;
  if (!options.chain) options.chain = {};

  options.chain.useCache = useCache;
  options.chain.useState = useState;
  options.chain.useNetwork = useNetwork;
  options.chain.saveNetwork = saveNetwork;

  // to avoid conflicts with public api
  delete options.useCache;
  delete options.useState;
  delete options.useNetwork;
  delete options.saveNetwork;

  return options;
}
