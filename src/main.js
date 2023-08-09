const productService = new ProductService('http://localhost:1111');

const displayProducts = async () => {
  const products = await productService.getProducts();
  const productsHtml = products.map(product => productHtml(product)).join('');

  document.getElementById('products').innerHTML = productsHtml;
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

function productHtml(product) {
  return (
    `<div id="${product.id}" class="product" onclick="displayProduct(${product.id})">` +
    `<span>Product ${product.name}</span><span>Price ${product.price} ${product.currency}</span><span>Quantity ${product.stock}</span><span>Used ${product.used}</span>` +
    `<button> Product details </button><span></span>` +
    `<button> Add to cart </button>` +
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
