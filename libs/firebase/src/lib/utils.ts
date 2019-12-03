import { Reative } from '@reative/core';

export function firebase() {
  return Reative.connector.firebase;
}

export function firestore() {
  return Reative.connector.firestore;
}
