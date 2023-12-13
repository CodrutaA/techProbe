// ProductService will be used in Browser and in NodeJS contract tests
const isNodeJs = typeof window === 'undefined';

if (isNodeJs) {
  const fetch2 = require('node-fetch');

  function fetch(...args) {
    return fetch2(...args);
  }
}

class CartService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getHealth() {
    return fetch(`${this.baseUrl}/health`)
      .then(res => res.json())
      .then(body => body?.healthy == true);
  }

  getCart() {
    return fetch(`${this.baseUrl}/cart`).then(res => res.json());
  }
}

if (isNodeJs) {
  module.exports = { ProductService };
}
