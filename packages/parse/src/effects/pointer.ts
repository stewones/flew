import { mapping } from './mapping';

/**
 * Creates a Parse pointer for relation fields.
 *
 * @export
 * @param {string} className
 * @param {string} objectId
 * @returns {*}
 */
export function pointer<T = any>(className: string, objectId: string): T {
  const p = {
    __type: 'Pointer',
    className: mapping[className] ? mapping[className] : className,
    objectId: objectId,
  };

  return p as any;
}
