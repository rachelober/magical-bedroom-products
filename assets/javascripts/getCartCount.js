const $ = require('jquery');
const fetchCart = require('./fetchCart');

function getCartCount(cart) {
  return cart.length;
}

module.exports = getCartCount;
