import { parse } from './parse';
import { mapping } from './mapping';

/**
 * Creates a Parse Query
 *
 * @export
 * @param {string} name
 * @returns Parse.Query
 */
export function query(name: string) {
  const Parse = parse();
  return new Parse.Query(mapping[name] ? mapping[name] : name);
}
