const $ = require('jquery');
const priceInt = require('./priceInt');

function calculateCartTotal(cart) {
  var total = 0
  $.each(cart, function( key, val ) {
    total += priceInt(val.price)
  });
  return total
}

module.exports = calculateCartTotal;
