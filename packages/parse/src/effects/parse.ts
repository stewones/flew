import { namespace } from '@flew/core';
const workspace = namespace();
/**
 * Retrieve the Parse instance
 *
 * @export
 * @returns {Parse}
 */
export function parse() {
  return workspace.driver.parse.getInstance();
}
