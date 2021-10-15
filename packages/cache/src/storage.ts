import * as LocalForage from 'localforage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { namespace, StorageAdapter } from '@flew/core';
const workspace = namespace();
/**
 * Retrieve the storage instance
 *
 * @export
 * @returns {StorageAdapter}
 */
export function storage(): StorageAdapter {
  const hasStorage = workspace.storage && workspace.storage.enabled;
  return hasStorage ? workspace.storage : ({} as StorageAdapter);
}

/**
 * Config helper
 *
 * @export
 * @param {string} [db='app:db']
 * @param {string} [store='app:store']
 * @param {string} [driver=['sqlite', 'indexeddb', 'localstorage']]
 * @returns {*}
 */
export function storageConfig(
  db = 'app:db',
  store = 'app:store',
  driver = ['sqlite', 'indexeddb', 'localstorage'],
) {
  return {
    name: db,
    storeName: store,
    driverOrder: driver,
  };
}

export interface StorageConfig {
  name?: string;
  version?: number;
  size?: number;
  storeName?: string;
  description?: string;
  driverOrder?: string[];
  dbKey?: string;
}

/**
 * Storage implementation
 *
 * @export
 * @class Storage
 */
export class Storage {
  private _dbPromise: Promise<LocalForage>;
  private _driver: string = null;

  constructor(config: StorageConfig) {
    this._dbPromise = new Promise((resolve, reject) => {
      let db: LocalForage;

      const defaultConfig = {
        name: '_rebased_storage_',
        storeName: '_rebased_store_',
        dbKey: '_rebased_key_',
        driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage'],
      };

      const actualConfig = Object.assign(defaultConfig, config || {});

      LocalForage.defineDriver(CordovaSQLiteDriver)
        .then(() => {
          db = LocalForage.createInstance(actualConfig);
        })
        .then(() =>
          db.setDriver(this._getDriverOrder(actualConfig.driverOrder)),
        )
        .then(() => {
          this._driver = db.driver();
          resolve(db);
        })
        .catch(reason => reject(reason));
    });
  }

  /**
   * Get the name of the driver being used.
   * @returns Name of the driver
   */
  get driver(): string | null {
    return this._driver;
  }

  /**
   * Reflect the readiness of the store.
   * @returns Returns a promise that resolves when the store is ready
   */
  ready(): Promise<LocalForage> {
    return this._dbPromise;
  }

  /** @hidden */
  private _getDriverOrder(driverOrder: string[]) {
    return driverOrder.map((driver: string) => {
      switch (driver) {
        case 'sqlite':
          return CordovaSQLiteDriver._driver;
        case 'indexeddb':
          return LocalForage.INDEXEDDB;
        case 'websql':
          return LocalForage.WEBSQL;
        case 'localstorage':
          return LocalForage.LOCALSTORAGE;
      }
    });
  }

  /**
   * Get the value associated with the given key.
   * @param key the key to identify this value
   * @returns Returns a promise with the value of the given key
   */
  get(key: string): Promise<any> {
    return this._dbPromise.then(db => db.getItem(key));
  }

  /**
   * Set the value for the given key.
   * @param key the key to identify this value
   * @param value the value for this key
   * @returns Returns a promise that resolves when the key and value are set
   */
  set(key: string, value: any): Promise<any> {
    return this._dbPromise.then(db => db.setItem(key, value));
  }

  /**
   * Remove any value associated with this key.
   * @param key the key to identify this value
   * @returns Returns a promise that resolves when the value is removed
   */
  remove(key: string): Promise<any> {
    return this._dbPromise.then(db => db.removeItem(key));
  }

  /**
   * Clear the entire key value store. WARNING: HOT!
   * @returns Returns a promise that resolves when the store is cleared
   */
  clear(): Promise<void> {
    return this._dbPromise.then(db => db.clear());
  }

  /**
   * @returns Returns a promise that resolves with the number of keys stored.
   */
  length(): Promise<number> {
    return this._dbPromise.then(db => db.length());
  }

  /**
   * @returns Returns a promise that resolves with the keys in the store.
   */
  keys(): Promise<string[]> {
    return this._dbPromise.then(db => db.keys());
  }

  /**
   * Iterate through each key,value pair.
   * @param iteratorCallback a callback of the form (value, key, iterationNumber)
   * @returns Returns a promise that resolves when the iteration has finished.
   */
  forEach(
    iteratorCallback: (value: any, key: string, iterationNumber: number) => any,
  ): Promise<void> {
    return this._dbPromise.then(db => db.iterate(iteratorCallback));
  }
}
