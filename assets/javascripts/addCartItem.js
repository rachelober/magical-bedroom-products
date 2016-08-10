'use strict';

const $ = require('jquery');

function parseJSON(cart) {
  return cart;
}

function addCartItem(cart_item, callback) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'http://localhost:3000/cart_order',
    data: cart_item,
    success: cart => callback(parseJSON(cart)),
  });
}

module.exports = addCartItem;
