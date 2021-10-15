import { parse } from './parse';
import { mapping } from './mapping';

/**
 * Creates a Parse Pointer
 *
 * @export
 * @param {string} name
 * @param {string} id
 * @returns {Parse.Object}
 */
export function pointer(name: string, id: string) {
  const Parse = parse();
  return new Parse.Object(mapping[name] ? mapping[name] : name).set('id', id);
}
