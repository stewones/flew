import { Reative } from '@reative/core';
import { FirebaseConnector, FirestoreConnector } from './connectors';

export interface ReativeFirebaseOptions {
  config: any;
  persistence: boolean;
}

export function firebase() {
  return Reative.connector.firebase;
}

export function firestore() {
  return Reative.connector.firestore;
}

export function install(Firebase, config, ReativePlatform?) {
  if (ReativePlatform) {
    ReativePlatform.connector.firebase = new FirebaseConnector(
      Firebase,
      config
    );
    ReativePlatform.connector.firestore = new FirestoreConnector(
      Firebase,
      config
    );
  } else {
    Reative.connector.firebase = new FirebaseConnector(Firebase, config);
    Reative.connector.firestore = new FirestoreConnector(Firebase, config);
  }
}
