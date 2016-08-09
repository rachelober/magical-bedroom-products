const $ = require('jquery');
const calculateCartTotal = require('./calculateCartTotal');
const fetchCart = require('./fetchCart');
const removeCartItem = require('./removeCartItem');
const getCartCount = require('./getCartCount');

$(document).ready(function() {
  var cart = []
  fetchCart(cart => {
    updateCartCount(getCartCount(cart));
    console.log(getCartCount(cart));
  });

});

$(".item__remove").click(function() {
  var item = $(this);
  var data_id = item.data("id");
  var parent_label = "cart-item-" + data_id;

  removeCartItem(data_id, function() {
    $("#cart-item-" + data_id).remove();
    updateCartTotal();
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

function updateCartTotal(ary) {
  total = "$" + calculateCartTotal([1200,200,400]);
  $("#cart-total").text(total);
}
