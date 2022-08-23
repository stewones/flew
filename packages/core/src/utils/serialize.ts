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
  if (value && typeof value === 'object') {
    if ('toJSON' in value) {
      value = serialize(value.toJSON());
    }
  }

  if (value && typeof value === 'function') {
    value = serialize(value());
  }

  if (value && typeof value === 'object') {
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        value[key] = serializeObject(key, stripEmoji(value[key]));
      }
    }
  }

  if (Array.isArray(value)) {
    for (let item of value) {
      item = serialize(item);
    }
  }

  return value;
}
