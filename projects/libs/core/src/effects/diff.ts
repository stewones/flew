import { transform, isEqual, isObject, isEmpty } from 'lodash-es';

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
  return changes(from_, to_);
}

export function isDiff(from_, to_): any {
  return from_?.length !== to_?.length
    ? true
    : isEmpty(from_) && !isEmpty(to_)
    ? true
    : isEmpty(from_) && isEmpty(to_)
    ? true
    : !isEmpty(diff(from_, to_));
}
