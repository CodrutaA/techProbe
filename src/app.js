const { getProduct, getProducts } = require('./ProductController');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.json());

const serveFileFromRoot = relativePath => (_req, res) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

app
  // frontend routes
  .get('/health', (req, res) => {
    res
      .status(200)
      .send(`Server running on: ${req.protocol}://${req.get('Host')}`);
  })
  .get('/', serveFileFromRoot('index.html'))
  .get('/ProductService', serveFileFromRoot('ProductService.js'))
  .get('/main', serveFileFromRoot('main.js'))

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
