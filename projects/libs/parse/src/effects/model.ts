import { parse } from './parse';
import { mapping } from './mapping';

/**
 * Extends Parse Object
 *
 * @export
 * @param {string} name
 * @returns {Parse.Object}
 */
export function model(name: string) {
  const Parse = parse();
  const Entity = Parse.Object.extend(mapping[name] ? mapping[name] : name);
  return new Entity();
}
