$(document).ready(function() {
  var api = "http://localhost:3000/cart_order";
  $.getJSON( api, { } )
    .done(function( data ) {
      $(".cart__count").text(data.length);
    });
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
    }
  });
});
