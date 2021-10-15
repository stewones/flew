import { namespace } from '@flew/core';
import { Storage, storageConfig } from './storage';

const workspace = namespace();
export interface FlewCacheOptions {
  name: string;
  store: string;
  driver?: string[];
}

/**
 * Cache setup
 *
 * @export
 * @param {*} name
 * @param {*} store
 * @param {string} [driver=['sqlite', 'indexeddb', 'localstorage']]
 */
export function cachePlugin(options: FlewCacheOptions) {
  return () => {
    workspace.storage = new Storage(
      storageConfig(
        options.name,
        options.store,
        options.driver || ['sqlite', 'indexeddb', 'localstorage'],
      ),
    );
    workspace.storage.enabled = true;
  };
}
