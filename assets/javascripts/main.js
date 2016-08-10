const $                   = require('jquery');
window.nunjucks           = require('nunjucks');

const addCartItem         = require('./addCartItem');
const calculateCartTotal  = require('./calculateCartTotal');
const fetchCart           = require('./fetchCart');
const getCartCount        = require('./getCartCount');
const priceInt            = require('./priceInt');
const removeCartItem      = require('./removeCartItem');

$(document).ready(function() {
  fetchCart(cart => {
    //renderCart();
    //renderProducts();
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

  request.done(function() {
    fetchCart(cart => {
      updateCartCount(getCartCount(cart));
      updateCartTotal(calculateCartTotal(cart));
    });
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
      updateCartCount(getCartCount(cart));
      updateCartTotal(calculateCartTotal(cart));
    });
  });
});

function addCartRow(data) {
  var name = data.name;
  var price = data.price;
  console.log(data);
  var res = nunjucks.render('views/cart-item.html', { id: 2, name: name, price: price });
  $("#cart-items").append(res);
}

function updateCartCount(num) {
  $("#cart-count").text(num);
}

function updateCartTotal(num) {
  var total = "$" + num;
  $("#cart-total").text(total);
}
