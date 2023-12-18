const { getProduct, getProducts } = require('./ProductController');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.json());

const serveFileFromRoot = relativePath => (_req, res) =>
  res.sendFile(path.join(`${__dirname}/ui/${relativePath}`));

app
  // UI routes
  .get('/', serveFileFromRoot('index.html'))
  .get('/style', serveFileFromRoot('style.css'))
  .get('/main', serveFileFromRoot('main.js'))

  .get('/cartPage', serveFileFromRoot('cart.html'))
  .get('/cart', serveFileFromRoot('cart.js'))
  .get('/cart-style', serveFileFromRoot('cart-style.css'))

  .get('/ProductService', serveFileFromRoot('ProductService.js'))

  // API routes
  .get('/health', health)
  .get('/products', getProducts)
  .get('/products/:productId', getProduct);

function health(_req, res) {
  const routes = app._router.stack.filter(r => r.route).map(r => r.route?.path);
  res.status(200).send({
    healthy: true,
    routes,
  });
}

// START WEB SERVER
const port = process.env.PORT || 1111;
app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
