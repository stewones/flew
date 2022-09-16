import { namespace } from '@flew/core';
import { Storage, storageConfig, Driver } from './storage';

const workspace = namespace();
export interface FlewCacheOptions {
  name: string;
  store: string;
  driver?: Driver[];
}

/**
 *
 *
 * @export
 * @param {FlewCacheOptions} options
 * @returns {*}
 */
export function cachePlugin(options: FlewCacheOptions) {
  return () => {
    workspace.storage = new Storage(
      storageConfig(options.name, options.store, options.driver),
    ) as any;
    workspace.storage.enabled = true;
  };
}
