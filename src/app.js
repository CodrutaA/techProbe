const { getProduct, getProducts } = require('./ProductController');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:1112' }));

// routes
app
  .get('/health', healthCheck)
  .get('/products', getProducts)
  .get('/products/:productId', getProduct);

const portControll = process.env.PORT || 1113;
app.listen(portControll, () => console.log(`Server listening on port backend: ${portControll}`));

function healthCheck(_req, res) {
  res.status(200).send({
    healthy: true,
  });
}

const path = require('path');

const serveFileFromRoot = relativePath => (_req, res) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

// routes
app
  .get('/health', (req, res) => {
    res
      .status(200)
      .send(`Server running on: ${req.protocol}://${req.get('Host')}`);
  })
  .get('/', serveFileFromRoot('index.html'))
  .get('/ProductService', serveFileFromRoot('ProductService.js'))
  .get('/main', serveFileFromRoot('main.js'));

const portService = process.env.PORT || 1112;
app.listen(portService, () => console.log(`Server listening on port frontend: ${portService}`));