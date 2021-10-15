import { namespace } from '@flew/core';
const workspace = namespace();

/**
 * Retrieve firebase instance
 *
 * @export
 * @returns {Firebase}
 */
export function firebase() {
  return workspace.driver.firebase.getInstance();
}
