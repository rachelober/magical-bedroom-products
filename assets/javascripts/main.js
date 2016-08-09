const $ = require('jquery');
const calculateCartTotal = require('./calculateCartTotal');

$(document).ready(function() {
  updateCartCount();
  updateCartTotal();
});

$(".item__remove").click(function() {
  var item = $(this);
  var data_id = item.data("id");
  var parent_label = "cart-item-" + data_id;
  var api = "http://localhost:3000/cart_order/" + data_id;

  $.ajax({
    url: api,
    type: 'DELETE',
    success: function(result) {
      $("#cart-item-" + data_id).remove();
      updateCartTotal();
    }
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

function updateCartCount() {
  var api = "http://localhost:3000/cart_order";
  $.getJSON( api, { } )
    .done(function( data ) {
      $("#cart-count").text(data.length);
    });
}

function updateCartTotal(ary) {
  total = "$" + calculateCartTotal([1200,200,400]);
  $("#cart-total").text(total);
}
