import { isBoolean } from 'lodash';
import { RebasedAPI } from '../interfaces/api';
import { RebasedOptions } from '../interfaces/options';
import { PlatformServer } from '../platforms/server';
import { PlatformBrowser } from '../platforms/browser';
import { isServer } from './isServer';

/**
 *
 *
 * @export
 * @param {string} [from='']
 * @param {RebasedOptions} [options={}]
 * @returns {RebasedAPI}
 */
export function fetch(
  from: string = '',
  options: RebasedOptions = {}
): RebasedAPI {
  const params = init(options);
  params.from = from;
  return isServer() ? new PlatformServer(params) : new PlatformBrowser(params);
}

/**
 * Options Initializer
 *
 * @param {Options} options
 * @returns {Options}
 */
function init(options: RebasedOptions): RebasedOptions {
  const useState = isServer()
    ? false
    : isBoolean(options.useState)
    ? options.useState
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

  options.useNetwork = useNetwork;
  options.useCache = useCache;
  options.useState = useState;

  return options;
}
