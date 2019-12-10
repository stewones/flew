import { Reative } from '@reative/core';
import { FirebaseConnector, FirestoreConnector } from './connectors';
import { merge } from 'lodash';

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

export function install(sdk, config, connector = Reative.connector) {
  merge(connector, { firebase: new FirebaseConnector(sdk, config) });
  merge(connector, { firestore: new FirestoreConnector(sdk, config) });
  Reative.connector = connector;
}
