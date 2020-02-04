import { Reative } from '@reative/core';
import { FirebaseConnector, FirestoreConnector } from './connectors';
import { FirebaseDriver } from '../driver/firebase';
import { FirestoreDriver } from '../driver/firestore';

export interface ReativeFirebaseOptions {
  config: any;
  persistence: boolean;
}

export function firebase() {
  return Reative.driver.firebase.getInstance();
}

export function firestore() {
  return Reative.driver.firestore.getInstance();
}

export function install(sdk, config) {
  Reative.drivers = [...Reative.drivers, 'firebase', 'firestore'];
  Reative.driver.firebase = new FirebaseDriver({
    instance: new FirebaseConnector(sdk, config)
  });
  Reative.driver.firestore = new FirestoreDriver({
    instance: new FirestoreConnector(sdk, config)
  });
}
