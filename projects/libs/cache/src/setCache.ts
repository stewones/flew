import { storage } from './storage';

/**
 * Programmatically way to set a key based cache
 *
 * @export
 * @param {*} key
 * @param {*} value
 * @returns {Void}
 */
export function setCache(key, value) {
  return storage().set(key, value);
}
