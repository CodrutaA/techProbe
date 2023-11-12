const cartProductService = new ProductService('http://localhost:1111');

if (getCart() == null) {
  setCart({});
}

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : cart;
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  if (cart[productId]) {
    cart[productId]++;
  } else {
    cart[productId] = 1;
  }
  setCart(cart);
  applyCart();
  logCart();
}

function removeFromCart(productId) {
  const cart = getCart();
  cart[productId]--;
  if (cart[productId] == 0) {
    delete cart[productId];
  }
  setCart(cart);
  if (cartSize() == 0) {
    clearCart();
  }
  logCart();
}

function applyCart() {
  const cart = getCart();
  if (cart == null) {
    console.log('cart is empty');
    return;
  }
  Object.entries(cart).forEach(([productId, quantity]) => {
    const stockToUpdate = document.querySelector(
      `#products [id="${productId}"] .stock`,
    );
    cartProductService.getProduct(productId).then(product => {
      stockToUpdate.textContent = product.stock - quantity;
    });
  });
}

function cartSize() {
  return Object.keys(getCart()).length;
}

function logCart() {
  console.log(JSON.stringify(getCart(), null, 2));
}

function displayCartProducts() {
  let totalPrice = 0;
  Object.entries(getCart()).forEach(([productId, quantity]) => {
    cartProductService.getProduct(productId).then(product => {
      product.stock = quantity;
      product.price = product.price * quantity;
      totalPrice += product.price;
      document.getElementById('cart-products').innerHTML +=
        cartProductHtml(product);
      document.getElementById('total-price').innerHTML =
        `<span class="name">Total</span>` +
        `<span class="stock"></span>` +
        `<span class="used"></span>` +
        `<span class="price">${totalPrice} RON</span>` +
        `<button id="checkout" onclick="checkout()">Proceed to checkout</button>`;
    });
  });
}

function cartProductHtml(product) {
  return (
    `<div id="${product.id}" class="product">` +
    `<span class="name">${product.name}</span>` +
    `<span class="stock">${product.stock}</span>` +
    `<span class="used">${product.used}</span>` +
    `<span class="price">${product.price} ${product.currency}</span>` +
    `<button onclick="removeFromCart(${product.id}); location.reload();">-</button>` +
    `<button onclick="addToCart(${product.id}); location.reload();">+</button>` +
    '</div>'
  );
}

function clearCart() {
  document.getElementById('cart-products').innerHTML = '';
  document.getElementById('total-price').innerHTML = '';
  localStorage.clear();
}

function checkout() {
  alert('Not implemented yet!');
}
