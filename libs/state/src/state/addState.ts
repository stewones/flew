import { setState } from './setState';

/**
 * Add state
 *
 * @export
 * @param {string} path
 * @param {*} value
 * @deprecated in favor of the new setState
 */
export function addState(path: string, value: any) {
  setState(path, value);
}
