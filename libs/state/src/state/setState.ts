import { SetStateOptions } from './state';
import { setMemo } from './setMemo';

/**
 *
 * @param key
 * @param value
 * @param options
 */
export function setState(
  key: string,
  value: any,
  options: SetStateOptions = { save: true }
) {
  return setMemo(key, value, options);
}
