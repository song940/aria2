require('isomorphic-fetch');

class HTTP {
  constructor(options) {
    Object.assign(this, {
      method: 'get'
    }, options);
  }
  request(method, url, body, headers) {
    return fetch(url, {
      method,
      headers,
      body
    }).then(res => res.json());
  }
  get(query) {
    const { method, url } = this;
    const u = new URL(url);
    for (const q of query)
      u.searchParams.append(q, query[q]);
    return this.request(method, u.toString());
  }
  post(payload) {
    const { method, url } = this;
    return this.request(method, url, JSON.stringify(payload));
  }
}

module.exports = HTTP;
