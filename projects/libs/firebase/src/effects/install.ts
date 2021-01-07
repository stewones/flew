import { Rebased } from '@rebased/core';
import * as Firebase from 'firebase/app';
import { FirebaseConnector, FirestoreConnector } from './connectors';
import { FirebaseDriver } from '../driver/firebase';
import { FirestoreDriver } from '../driver/firestore';

export interface FirebaseInstallOptions {
  config?: any;
  firebaseInstance?: any;
  firestoreInstance?: any;
  namespace?: string;
}

/**
 * Firebase setup
 *
 * @export
 * @param {FirebaseInstallOptions} options
 */
export function install(options: FirebaseInstallOptions) {
  const sdk = Firebase.default;

  if (
    options.config &&
    (options.firestoreInstance || options.firebaseInstance)
  ) {
    throw 'you can only pass config and either firebaseInstance or firestoreInstance';
  }

  if (options.config) {
    const isDriverAvailable = Rebased.drivers.find(it => it === 'firebase');
    if (!isDriverAvailable) {
      Rebased.drivers = [...Rebased.drivers, 'firebase', 'firestore'];
    }
  }

  if (options.firebaseInstance) {
    const isDriverAvailable = Rebased.drivers.find(it => it === 'firebase');
    if (!isDriverAvailable) {
      Rebased.drivers = [...Rebased.drivers, 'firebase'];
    }
  }

  if (options.firestoreInstance) {
    const isDriverAvailable = Rebased.drivers.find(it => it === 'firestore');
    if (!isDriverAvailable) {
      Rebased.drivers = [...Rebased.drivers, 'firestore'];
    }
  }

  Rebased.driver.firebase = new FirebaseDriver({
    instance: options.firebaseInstance
      ? options.firebaseInstance
      : new FirebaseConnector(sdk, options.config)
  });

  Rebased.driver.firestore = new FirestoreDriver({
    instance: options.firestoreInstance
      ? options.firestoreInstance
      : new FirestoreConnector(sdk, options.config, options.namespace)
  });
}
