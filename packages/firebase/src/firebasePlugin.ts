import * as Firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/firestore';

import { namespace } from '@flew/core';
import { FirebaseDriver } from './driver/firebase';
import { FirebaseConnector, FirestoreConnector } from './setup/connectors';
import { FirestoreDriver } from './driver/firestore';
const workspace = namespace();
export interface FirebaseInstallOptions {
  config?: any;
  firebaseInstance?: any;
  firestoreInstance?: any;
  namespace?: string;
}

export function firebasePlugin(options: FirebaseInstallOptions) {
  return () => {
    const sdk = Firebase.default;

    if (
      options.config &&
      (options.firestoreInstance || options.firebaseInstance)
    ) {
      throw 'you can only set config or firebaseInstance or firestoreInstance';
    }

    if (options.config) {
      const isDriverAvailable = workspace.drivers.find(it => it === 'firebase');
      if (!isDriverAvailable) {
        workspace.drivers = [...workspace.drivers, 'firebase', 'firestore'];
      }
    }

    if (options.firebaseInstance) {
      const isDriverAvailable = workspace.drivers.find(it => it === 'firebase');
      if (!isDriverAvailable) {
        workspace.drivers = [...workspace.drivers, 'firebase'];
      }
    }

    if (options.firestoreInstance) {
      const isDriverAvailable = workspace.drivers.find(
        it => it === 'firestore',
      );
      if (!isDriverAvailable) {
        workspace.drivers = [...workspace.drivers, 'firestore'];
      }
    }

    workspace.driver.firebase = new FirebaseDriver({
      instance: options.firebaseInstance
        ? options.firebaseInstance
        : new FirebaseConnector(sdk, options.config),
    });

    workspace.driver.firestore = new FirestoreDriver({
      instance: options.firestoreInstance
        ? options.firestoreInstance
        : new FirestoreConnector(sdk, options.config, options.namespace),
    });
  };
}
