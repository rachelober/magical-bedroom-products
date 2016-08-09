// cartItem.js
import request from './request';

export function getCartItemName(cartID) {
  return request('/cart_orders/' + cartID).then(cart => cart.name);
}
