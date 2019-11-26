import { ReativeOptions } from '../interfaces/options';
import { isBoolean } from 'lodash';
import { isServer } from '../utils/platform';
import { PlatformServer, Records } from '../platforms/server';
import { PlatformBrowser } from '../platforms/browser';

/**
 * Collection Decorator
 *
 * @export
 * @param {Options} options
 * @returns
 */
export function Collection(options: ReativeOptions) {
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
export function collection(
  name: string,
  options: ReativeOptions = {}
): Records {
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
function init(options: ReativeOptions): ReativeOptions {
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

  options.useNetwork = useNetwork;
  options.saveNetwork = saveNetwork;
  options.useCache = useCache;
  options.useState = useState;

  return options;
}
