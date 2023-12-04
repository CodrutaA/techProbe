const { getProduct, getProducts } = require('./ProductController');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.json());

const serveFileFromRoot = relativePath => (_req, res) =>
  res.sendFile(path.join(`${__dirname}/ui/${relativePath}`));

app
  // frontend routes
  .get('/', serveFileFromRoot('index.html'))
  .get('/style', serveFileFromRoot('style.css'))
  .get('/main', serveFileFromRoot('main.js'))

  .get('/cartPage', serveFileFromRoot('cart.html'))
  .get('/cart', serveFileFromRoot('cart.js'))
  .get('/cart-style', serveFileFromRoot('cart-style.css'))

  .get('/ProductService', serveFileFromRoot('ProductService.js'))

  // backend routes
  .get('/health', healthCheck)
  .get('/products', getProducts)
  .get('/products/:productId', getProduct);

function healthCheck(_req, res) {
  res.status(200).send({
    healthy: true,
  });
}

const port = process.env.PORT || 1111;
app.listen(port, () =>
  console.log(`Server listening on port: http://localhost:${port}`),
);
