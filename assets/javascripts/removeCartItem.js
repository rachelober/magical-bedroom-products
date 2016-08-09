const $ = require('jquery');
const fetchCart = require('./fetchCart');

function parseJSON(cart) {
  return cart;
}

function removeCartItem(id, callback) {
  return $.ajax({
    type: 'DELETE',
    url: 'http://localhost:3000/cart_order/' + id,
    success: cart => callback(parseJSON(cart)),
  });
}

module.exports = removeCartItem;
