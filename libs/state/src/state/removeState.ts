import { unsetState } from './unsetState';

/**
 * Remove memoized/cached state based on key
 *
 * @export
 * @param {string} key
 * @param {{ cache: boolean }} [options={ cache: true }]
 * @deprecated replace to the new unset() api
 * @returns {Promise<boolean>}
 */
export function removeState(
  key: string,
  options: { cache: boolean } = { cache: true }
): Promise<boolean> {
  return unsetState(key, options);
}
