function getProducts(_req, res) {
  try {
    const products = readProducts();
    res.send(products.filter(isAvalilable));
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Failed to get products' });
  }
}

function getProduct(req, res) {
  const products = readProducts();
  const productId = parseInt(req.params.productId);
  try {
    const product = { ...products.find(product => product.id === productId) };
    res.send(product);
  } catch (e) {
    res.status(500).send({ error: `Failed to get product ${productId}` });
  }
}

function readProducts() {
  return require('../data/products.json');
}

function isAvalilable(product) {
  return product?.stock > 0;
}

module.exports = { getProduct, getProducts };
