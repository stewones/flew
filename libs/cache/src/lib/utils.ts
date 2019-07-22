import { Reative, StorageAdapter } from '@reative/records';

/**
 * A simple helper for getting the ionic storage config
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
