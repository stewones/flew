import { storage } from './storage';

/**
 * Get cache based on some key
 *
 * @export
 * @param {*} key
 * @returns {*}
 * @example
 *
 * ```ts
 * import { getCache } from '@flew/cache';
 *
 * const dataKey = 'my-key';
 * console.log(await getCache('my-key'))
 * ```
 */
export function getCache(key): any {
  return storage().get(key);
}
