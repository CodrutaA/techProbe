const { expect } = require('chai');

const PRODUCTS_URL = 'http://localhost:1111/products';
const expectedProducts = require('../../data/products.json');

describe('API Smoke Test', () => {
  test(`all available products can be fetched`, async () => {
    const products = await fetch(PRODUCTS_URL).then(r => r.json());
    expect(products).to.deep.equal(expectedProducts);
  });

  test(`product with id 100 can be fetched`, async () => {
    const products = await fetch(`${PRODUCTS_URL}/100`).then(r => r.json());
    expect(products).to.deep.equal(expectedProducts[0]);
  });
});
