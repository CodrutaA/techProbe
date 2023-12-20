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

async function addToCart(productId, isMainPage = true) {
  const cart = getCart();
  const cartQuantity = cart ? cart[productId] : 0;
  const stock =
    (await cartProductService.getProduct(productId)).stock - cartQuantity;
  if (stock == 0) {
    alert('Out of stock.');
    return;
  }
  if (cartQuantity > 0) {
    cart[productId]++;
  } else {
    cart[productId] = 1;
  }
  setCart(cart);
  if (isMainPage) {
    applyCart();
  }
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
    if (stockToUpdate != null) {
      cartProductService.getProduct(productId).then(product => {
        const newStock = product.stock - quantity;
        stockToUpdate.textContent = newStock;
        if (newStock == 0) {
          document
            .getElementById('products')
            .removeChild(document.getElementById(productId));
        }
      });
    }
  });
  if (cartSize()) {
    document.getElementById('cartSize').textContent = ` [${cartSize()}]`;
  }
}

function cartSize() {
  return Object.values(getCart()).reduce((a, b) => a + b, 0);
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
        totalPriceHtml(totalPrice);
    });
  });
}

function cartProductHtml(product) {
  return (
    `<div id="row_${product.id}" class="product">` +
    `<span class="name">${product.name}</span>` +
    `<span class="stock">${product.stock}</span>` +
    `<span class="used">${product.used}</span>` +
    `<span class="price">${product.price} ${product.currency}</span>` +
    `<button class="minus" onclick="removeFromCart(${product.id}); location.reload();">-</button>` +
    `<button class="plus" onclick="addToCart(${product.id}, false).then(()=>{ location.reload(); });">+</button>` +
    '</div>'
  );
}

function totalPriceHtml(totalPrice) {
  return (
    '<span class="name">Total</span>' +
    '<span class="stock"></span>' +
    '<span class="used"></span>' +
    `<span class="price">${totalPrice} RON</span>` +
    '<button id="checkout" onclick="checkout()">Proceed to checkout</button>'
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
