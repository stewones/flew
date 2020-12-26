import { Rebased } from '@rebased/core';
import { Storage } from '@ionic/storage';
import { storageConfig } from './storageConfig';

export function install(
  name,
  store,
  driver = ['sqlite', 'indexeddb', 'localstorage']
) {
  Rebased.storage = new Storage(storageConfig(name, store, driver), null);
  Rebased.storage.enabled = true;
}
