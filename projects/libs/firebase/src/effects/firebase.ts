import { Rebased } from '@rebased/core';

/**
 * Retrieve firebase instance
 *
 * @export
 * @returns {Firebase}
 */
export function firebase() {
  return Rebased.driver.firebase.getInstance();
}
