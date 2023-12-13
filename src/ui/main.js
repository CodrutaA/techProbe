const productService = new ProductService('http://localhost:1111');

const displayProducts = async () => {
  const products = await productService.getProducts();
  const productsHtml = products.map(product => productHtml(product)).join('');

  document.getElementById('products').innerHTML =
    productsHeader() + productsHtml;

  applyCart();
};

const displayProduct = async productId => {
  const product = await productService.getProduct(productId);
  const productHtml = Object.entries(product).reduce(
    (acc, [productDetailName, productDetailValue]) =>
      acc + productDetailHtml(productDetailName, productDetailValue),
    '<h3>Product details</h3>',
  );
  document.getElementById('product').innerHTML = productHtml;
};

function productsHeader() {
  return (
    `<div id="products-header">` +
    `<span class="name">Product</span>` +
    `<span class="price">Price[RON]</span>` +
    `<span class="stock">Quantity</span>` +
    `<span class="used">Used</span>` +
    '</div>'
  );
}

function productHtml(product) {
  return (
    `<div id="row_${product.id}" class="product">` +
    `<span class="name">${product.name}</span>` +
    `<span class="price">${product.price} ${product.currency}</span>` +
    `<span class="stock">${product.stock}</span>` +
    `<span class="used">${product.used}</span>` +
    `<button class="addCart" onclick="addToCart(${product.id})">Add to cart</button>` +
    '</div>'
  );
}

function productDetailHtml(name, value) {
  return (
    `<div class="productDetail">` +
    `<span>${name}</span><span>${
      value === 'shop' ? value.name + value.location : value
    }</span>` +
    '</div>'
  );
}
