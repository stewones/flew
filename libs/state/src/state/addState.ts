import { setState } from './setState';

/**
 * Add state
 *
 * @export
 * @param {string} key
 * @param {*} value
 * @deprecated in favor of the new setState
 */
export function addState(key: string, value: any) {
  setState(key, value);
}
