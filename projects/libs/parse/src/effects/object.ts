import { parse } from './parse';
import { mapping } from './mapping';

/**
 * Creates a Parse Object
 *
 * @export
 * @param {string} from
 * @param {*} [attr={}]
 * @param {*} [options={}]
 * @returns Parse.Object
 */
export function object(from: string, attr = {}, options = {}) {
  const Parse = parse();
  return new Parse.Object(mapping[from] ? mapping[from] : from, attr, options);
}
