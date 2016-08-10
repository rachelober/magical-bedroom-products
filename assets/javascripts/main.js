const $                   = require('jquery');
const addCartItem         = require('./addCartItem');
const calculateCartTotal  = require('./calculateCartTotal');
const fetchCart           = require('./fetchCart');
const getCartCount        = require('./getCartCount');
const priceInt            = require('./priceInt');
const removeCartItem      = require('./removeCartItem');

$(document).ready(function() {
  fetchCart(cart => {
    updateCartCount(getCartCount(cart));
    updateCartTotal(calculateCartTotal(cart));
  });
});

$(".product__buy").click(function() {
  var item        = $(this);
  var dataName    = item.data("name");
  var dataPrice   = item.data("price");
  var data        = { name: dataName, price: dataPrice }

  var request = addCartItem(data, function() {
    addCartRow(data);
  });
});

$(".item__remove").click(function() {
  var item          = $(this);
  var data_id       = item.data("id");
  var parent_label  = "cart-item-" + data_id;

  var request = removeCartItem(data_id, function() {
    $("#cart-item-" + data_id).remove();
  });

  request.done(function() {
    fetchCart(cart => {
      console.log(cart);
      updateCartCount(getCartCount(cart));
      updateCartTotal(calculateCartTotal(cart));
    });
  });
});

function addCartRow(data) {
  $('#cart-items').text("test");
}

function updateCartCount(num) {
  $("#cart-count").text(num);
}

function updateCartTotal(num) {
  total = "$" + num;
  $("#cart-total").text(total);
}
