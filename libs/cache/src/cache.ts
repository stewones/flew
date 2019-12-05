import { Reative, StorageAdapter } from '@reative/core';

export interface CacheOptions {
  dbName: string;
  dbStore: string;
}

/**
 * Configure storage
 *
 * @export
 * @param {string} [db='app:db']
 * @param {string} [store='app:store']
 * @param {string} [driver=['sqlite', 'indexeddb', 'localstorage']]
 */
export function storageConfig(
  db = 'app:db',
  store = 'app:store',
  driver = ['sqlite', 'indexeddb', 'localstorage']
) {
  return {
    name: db,
    storeName: store,
    driverOrder: driver
  };
}

export function storage(): StorageAdapter {
  const hasStorage = Reative.storage && Reative.storage.forEach;
  return hasStorage ? Reative.storage : ({} as StorageAdapter);
}

export function resetCache() {
  Reative.storage.clear();
}

/**
 * Initialize stuff for a given storage instance
 *
 * @export
 * @param {*} instance
 */
export function install(instance) {
  Reative.storage = instance;
  Reative.storage.enabled = true;
}
