const $ = require('jquery');
const calculateCartTotal = require('./calculateCartTotal');
const fetchCart = require('./fetchCart');
const removeCartItem = require('./removeCartItem');
const getCartCount = require('./getCartCount');

$(document).ready(function() {
  fetchCart(cart => {
    updateCartCount(getCartCount(cart));
    updateCartTotal(calculateCartTotal(cart));
  });
});

$(".item__remove").click(function() {
  var item = $(this);
  var data_id = item.data("id");
  var parent_label = "cart-item-" + data_id;

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

$(".product__buy").click(function() {
  var item = $(this);
  var data_id = item.data("id");
  var parent_label = "cart-item-" + data_id;
  var api = "http://localhost:3000/cart_order/";

  $.ajax({
    url: api,
    type: 'PUT',
    data: {
      item: "test"
    },
    success: function(result) {
      updateCartTotal();
      updateCartCount();
    }
  });
});

function updateCartCount(num) {
  $("#cart-count").text(num);
}

function updateCartTotal(num) {
  total = "$" + num;
  $("#cart-total").text(total);
}
