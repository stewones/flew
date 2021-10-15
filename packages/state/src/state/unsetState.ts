import { dispatch } from '../store/dispatch';
import { namespace } from '@flew/core';
const workspace = namespace();
/**
 * Remove specific fetch state
 *
 * @export
 * @param {string} key
 * @param {{ cache: boolean }} [options={ cache: true }]
 * @returns {Promise<void>}
 */
export function unsetState(
  key: string,
  options: { cache: boolean } = { cache: true },
): Promise<void> {
  dispatch({
    type: 'fetchStateRemove',
    key: key,
  });
  if (options.cache) {
    return workspace.storage.remove(key);
  }
  return Promise.resolve();
}
