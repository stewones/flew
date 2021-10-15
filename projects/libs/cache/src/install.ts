import { Rebased } from '@rebased/core';
import { Storage, storageConfig } from './storage';

/**
 * Cache setup
 *
 * @export
 * @param {*} name
 * @param {*} store
 * @param {string} [driver=['sqlite', 'indexeddb', 'localstorage']]
 */
export function install(
  name,
  store,
  driver = ['sqlite', 'indexeddb', 'localstorage']
) {
  Rebased.storage = new Storage(storageConfig(name, store, driver));
  Rebased.storage.enabled = true;
}
