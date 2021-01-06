import { isBoolean } from 'lodash';
import { RebasedBridge } from '../interfaces/bridge';
import { RebasedOptions } from '../interfaces/options';
import { FetchServer } from '../fetch/server';
import { FetchBrowser } from '../fetch/browser';
import { isServer } from './isServer';
import { Rebased } from '../symbols/rebased';

/**
 *
 *
 * @export
 * @param {string} [collection='']
 * @param {RebasedOptions} [options={}]
 * @returns {RebasedBridge}
 */
export function fetch(
  collection: string = '',
  options: RebasedOptions = {}
): RebasedBridge {
  const params = init(options);
  params.collection = collection;
  params.from = options.from || Rebased.options.driver || 'http';
  return isServer() ? new FetchServer(params) : new FetchBrowser(params);
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
