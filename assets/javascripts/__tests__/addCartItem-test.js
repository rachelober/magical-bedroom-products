'use strict';

jest.unmock('../addCartItem.js');

describe('addCartItem', () => {
  it('calls into $.ajax with the correct params', () => {
    const $ = require('jquery');
    const addCartItem = require('../addCartItem');

    // Call into the function we want to test
    const cart_item = { name: "test", description: "test", price: "$20" }
    const dummyCallback = () => {};
    addCartItem(cart_item, dummyCallback);

    // Now make sure that $.ajax was properly called during the previous
    // 2 lines
    expect($.ajax).toBeCalledWith({
      type: 'POST',
      dataType: 'json',
      url: 'http://localhost:3000/cart_order',
      success: jasmine.any(Function),
      data: cart_item,
    });
  });

  it('cart is updated with the new data', () => {
    const $ = require('jquery');
    const addCartItem = require('../addCartItem');

    // Create a mock function for our callback
    const cart_item = { name: "test", description: "test", price: "$20" }
    const callback = jest.fn();
    addCartItem(cart_item, callback);

    // Now we emulate the process by which `$.ajax` would execute its own
    // callback
    $.ajax.mock.calls[0/*first call*/][0/*first argument*/].success({
      cart_order: [
        {
          id: 1,
          name: "Never ending glass of Water",
          description: "Tired of running out of water when you sleep? This glass of water is always half-full. And it always stays clean and germ free!",
          price: "$2000"
        },
        {
          id: 2,
          name: "Reusable Tissues",
          description: "Every good beside has a box of tissues. Never run out with reusable tissues. A must for all sleepers with allergies.",
          price: "$1500"
        }
      ]
    });

    // And finally we assert that this emulated call by `$.ajax` incurred a
    // call back into the mock function we provided as a callback
    expect(callback.mock.calls[0/*first call*/][0/*first arg*/]).toEqual({
      cart_order: [
        {
          id: 1,
          name: "Never ending glass of Water",
          description: "Tired of running out of water when you sleep? This glass of water is always half-full. And it always stays clean and germ free!",
          price: "$2000"
        },
        {
          id: 2,
          name: "Reusable Tissues",
          description: "Every good beside has a box of tissues. Never run out with reusable tissues. A must for all sleepers with allergies.",
          price: "$1500"
        }
      ]
    });
  });
});
