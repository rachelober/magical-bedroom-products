const $ = require('jquery');

function parseJSON(cart) {
  return cart;
}

function fetchCart(callback) {
  return $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/cart_order',
    success: cart => callback(parseJSON(cart)),
  });
}

module.exports = fetchCart;
