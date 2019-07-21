import { Reactive, StorageAdapter } from '@reactive/records';

/**
 * A simple helper for getting the ionic storage config
 */
export function storageConfig(
  db = 'app:db',
  store = 'app:store',
  driver = ['sqlite', 'indexeddb', 'localstorage', 'websql']
) {
  return {
    name: db,
    storeName: store,
    driverOrder: driver
  };
}

export function storage(): StorageAdapter {
  const hasStorage = Reactive.storage && Reactive.storage.forEach;
  return hasStorage ? Reactive.storage : ({} as StorageAdapter);
}
