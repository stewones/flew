import { Rebased } from '@rebased/core';

export function firestore() {
  return Rebased.driver.firestore.getInstance();
}
