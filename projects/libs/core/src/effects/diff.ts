import { transform, isEqual, isObject } from 'lodash';

export function diff(from_, to_): any {
  function changes(from, to): any {
    return transform(from, function(result, value, key) {
      if (!isEqual(value, to[key])) {
        result[key] =
          isObject(value) && isObject(to[key])
            ? changes(value, to[key])
            : value;
      }
    });
  }
  return from_?.length !== to_?.length ? true : changes(from_, to_).length;
}
