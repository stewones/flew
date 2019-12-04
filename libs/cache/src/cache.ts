import { Reative, StorageAdapter } from '@reative/core';

export interface CacheOptions {
  dbName: string;
  dbStore: string;
}

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

export function install(instance) {
  Reative.storage = instance;
  Reative.storage.enabled = true;
}
