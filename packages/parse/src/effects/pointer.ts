import { parse } from './parse';
import { mapping } from './mapping';

/**
 * Creates a Parse pointer for relations
 *
 * @export
 * @template T
 * @param {string} name
 * @param {(string | any)} id
 * @param {{ clear?: boolean }} [options={ clear: true }]
 * @returns {*}  {T}
 */
export function pointer<T = any>(
  name: string,
  id: string | any,
  options: { clear?: boolean } = { clear: false },
): T {
  const Parse = parse();
  const parsePointer = new Parse.Object(
    mapping[name] ? mapping[name] : name,
  ).set('id', id);
  if (options.clear) {
    return parsePointer.clear();
  }
  return parsePointer;
}
