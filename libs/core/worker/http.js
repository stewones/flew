onmessage = payload => {
  const data = payload.data || {};
  const url = data.url;
  const method = data.method || 'get';
  const token = data.token;
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // console.log(`message from worker`, payload.data);

  fetch(url, {
    method: method,
    headers: headers
  })
    .then(response => {
      response.json().then(it => postMessage(it));
    })
    .catch(err => console.log(err));
};
