onmessage = req => {
  const data = req.data || {};
  const url = data.url;
  const method = data.method || 'get';
  const body = data.body;
  const key = data.key;
  const collection = data.collection;

  let headers = {
    ...data.headers
  };

  let payload = {
    method: method,
    headers: headers,
    cache: 'no-cache'
  };

  if (method !== 'get') {
    headers = {
      ...headers,
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    };
    payload = {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: 'no-cache'
    };
  }

  fetch(url, payload).then(async response => {
    if (response.status >= 200 && response.status < 300) {
      try {
        const it = await response.json();
        postMessage({ key: key, collection: collection, data: it });
      } catch (err) {
        postMessage({ key: key, collection: collection, data: [] });
      }
    } else {
      response.json().then(err => {
        postMessage({ key: key, collection: collection, error: err });
      });
    }
  });
};
