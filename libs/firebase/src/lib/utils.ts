import { Reative } from '@reative/records';

export function firebase() {
  return Reative.connector.firebase;
}

export function firestore() {
  return Reative.connector.firestore;
}
