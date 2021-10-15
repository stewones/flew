import { storage } from './storage';

/**
 * Clear cache storage
 *
 * @export
 */
export function resetCache() {
  storage().clear();
}
