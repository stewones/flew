import * as Firebase from 'firebase/app';
import { Rebased } from '@rebased/core';
import { FirebaseConnector, FirestoreConnector } from './connectors';
import { FirebaseDriver } from '../driver/firebase';
import { FirestoreDriver } from '../driver/firestore';

export function firebase() {
  return Rebased.driver.firebase.getInstance();
}

export function firestore() {
  return Rebased.driver.firestore.getInstance();
}

export function install(options: {
  config?: any;
  firebaseInstance?: any;
  firestoreInstance?: any;
  namespace?: string;
}) {
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
