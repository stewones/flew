import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import * as Firebase from 'firebase/app';
import { FirebaseConnector, FirestoreConnector } from '@reactive/records';

import { Storage } from '@ionic/storage';
import { Reactive } from '@reactive/records';
import { storageConfig } from '@reactive/cache';
import { firebaseConfig } from './firebase.config';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const appVersion: number | string = '0001'; // MAJOR.MINOR.PATCH.BUILD

export const environment = {
  production: false
};

Reactive.options = {
  // useCache: false,
  useLog: !environment.production,
  // useLogTrace: !environment.production,
  baseURL: 'https://api.thecatapi.com',
  endpoint: '',
  connector: {
    firebase: new FirebaseConnector(Firebase, firebaseConfig),
    firestore: new FirestoreConnector(Firebase, firebaseConfig)
  },

  // extra options
  storage: new Storage(storageConfig())
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
