'use strict';

const $ = require('jquery');

function addCartItem(cart_item, callback) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'http://localhost:3000/cart_order/',
    data: cart_item,
  });
}

module.exports = addCartItem;
