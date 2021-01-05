import { Rebased } from '@rebased/core';
import { Storage } from '@ionic/storage';
import { storageConfig } from './storageConfig';

/**
 * Cache install
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
  Rebased.storage = new Storage(storageConfig(name, store, driver), null);
  Rebased.storage.enabled = true;
}
