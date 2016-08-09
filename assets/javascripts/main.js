$(document).ready(function() {
  var api = "http://localhost:3000/cart_order";
  $.getJSON( api, { } )
    .done(function( data ) {
      $(".cart__count").text(data.length);
    });
});
