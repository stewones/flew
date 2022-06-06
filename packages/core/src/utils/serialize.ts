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
  let data = value;
  if (Array.isArray(data)) {
    data = [...value];
  } else if (data && typeof data === 'object') {
    if ('toJSON' in data) return data.toJSON();
    data = { ...data };
  }

  if (typeof data === 'function') {
    data = data();
  }

  if (typeof data === 'object') {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        data[key] = serializeObject(key, data[key]);
      }
    }
  }

  return data;
}
