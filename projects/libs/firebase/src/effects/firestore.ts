import { Rebased } from '@rebased/core';

/**
 * Retrieve firestore instance
 *
 * @export
 * @returns {Firebase}
 */
export function firestore() {
  return Rebased.driver.firestore.getInstance();
}
