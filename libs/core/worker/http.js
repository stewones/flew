onmessage = req => {
  const data = req.data || {};
  const url = data.url;
  const method = data.method || 'get';
  const body = data.body;

  let headers = {
    ...data.headers
  };

  let payload = {
    method: method,
    headers: headers
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
      body: JSON.stringify(body)
    };
  }

  fetch(url, payload).then(response => {
    if (response.status >= 200 && response.status < 300) {
      response.json().then(it => postMessage(it));
    } else {
      response.json().then(err => {
        postMessage({ error: err });
      });
    }
  });
};
