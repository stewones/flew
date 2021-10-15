import { namespace } from '@flew/core';
const workspace = namespace();
/**
 * Retrieve firestore instance
 *
 * @export
 * @returns {Firebase}
 */
export function firestore() {
  return workspace.driver.firestore.getInstance();
}
