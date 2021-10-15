import { namespace, FlewOptions, isServer } from '@flew/core';
import { isBoolean } from 'lodash';
import { FetchServer } from './server';
import { FetchBrowser } from './browser';

const workspace = namespace();
/**
 *
 *
 * @export
 * @param {string} [collection='']
 * @param {FlewOptions} [options={}]
 */
export function fetch(collection = '', options: FlewOptions = {}) {
  const params = init(options);
  params.collection = collection;
  params.from = options.from || workspace.options.driver || 'http';
  return isServer() ? new FetchServer(params) : new FetchBrowser(params);
}

/**
 * Options Initializer
 *
 * @param {Options} options
 * @returns {Options}
 */
function init(options: FlewOptions): FlewOptions {
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
