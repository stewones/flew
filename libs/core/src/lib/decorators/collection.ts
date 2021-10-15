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
 * @returns Records
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
  const useMemo = isServer()
    ? false
    : isBoolean(options.useMemo)
    ? options.useMemo
    : true;

  const useCache = isServer()
    ? false
    : isBoolean(options.useCache)
    ? options.useCache
    : true;

  const useNetwork = isServer()
    ? true
    : isBoolean(options.useNetwork)
    ? options.useNetwork
    : true;

  /**
   * @deprecated
   */
  const useState = isServer()
    ? false
    : isBoolean(options.useState)
    ? options.useState
    : true;

  /**
   * @deprecated
   */
  const saveNetwork = isServer()
    ? false
    : isBoolean(options.saveNetwork)
    ? options.saveNetwork
    : true;

  if (options.name) options.collection = options.name;

  options.useNetwork = useNetwork;

  options.useCache = useCache;
  options.useState = useState;
  options.saveNetwork = saveNetwork;
  options.useMemo = useMemo;

  return options;
}
