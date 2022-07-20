import { isString } from 'lodash';
import { stripEmoji } from './strip';

/**
 *
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function serialize(data) {
  return JSON.stringify(data, serializeObject);
}

function serializeObject(_key, value) {
  if (typeof value === 'object') {
    if ('toJSON' in value) {
      value = serialize(value.toJSON());
    }
  }

  if (typeof value === 'function') {
    value = serialize(value());
  }

  if (typeof value === 'object') {
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        value[key] = serializeObject(key, stripEmoji(value[key]));
      }
    }
  }

  if (Array.isArray(value)) {
    for (let item of value) {
      item = serialize(item);
      // for (const key in item) {
      //   value[key] = serializeObject(key, item[key]);
      // }
    }
  }

  return value;
}
