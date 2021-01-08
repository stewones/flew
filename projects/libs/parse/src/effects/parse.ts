import { Rebased } from '@rebased/core';

/**
 * Retrieve the Parse instance
 *
 * @export
 * @returns {Parse}
 */
export function parse() {
  return Rebased.driver.parse.getInstance();
}
