$(document).ready(function() {
  updateCartCount();
  updateCartTotal();
  fetchProducts();
  fetchCart();
  calculateTotal();
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

function fetchProducts() {
  var api = "http://localhost:3000/products";

  var response = $.getJSON( api, function( data ) {
    return data
  });


  return response;
}

function fetchCart() {
  var uri = "http://localhost:3000/cart_order";
  var cart = [];

  $.ajax({
    url: uri,
    type: 'get',
    dataType: 'json',
    success: function(data) {
      $.each(data, function( key, val ) {
        //console.log(key);
      });
    },
    error: function(e) {
      console.log(e.message);
    }
  });
}



function updateCartCount() {
  var api = "http://localhost:3000/cart_order";
  $.getJSON( api, { } )
    .done(function( data ) {
      $("#cart-count").text(data.length);
    });
}

function updateCartTotal() {
  total = "$" + calculateTotal();
  $("#cart-total").text(total);
}


