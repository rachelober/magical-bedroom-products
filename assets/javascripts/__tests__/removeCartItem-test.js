'use strict';

jest.unmock('../removeCartItem.js');

describe('removeCartItem', () => {
  it('calls into $.ajax with the correct params', () => {
    const $ = require('jquery');
    const removeCartItem = require('../removeCartItem');

    // Call into the function we want to test
    const dummyCallback = () => {};
    const dummyID = 2;
    removeCartItem(2, dummyCallback);

    // Now make sure that $.ajax was properly called during the previous
    // 2 lines
    expect($.ajax).toBeCalledWith({
      type: 'DELETE',
      url: 'http://localhost:3000/cart_order/' + dummyID,
      success: jasmine.any(Function),
    });
  });

  it('the resource is deleted when $.ajax requests are finished', () => {
    const $ = require('jquery');
    const removeCartItem = require('../removeCartItem');

    // Create a mock function for our callback
    const callback = jest.fn();
    removeCartItem(2, callback);

    // Now we emulate the process by which `$.ajax` would execute its own
    // callback
    $.ajax.mock.calls[0/*first call*/][0/*first argument*/].success({
      cart_order: [
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
          id: 2,
          name: "Reusable Tissues",
          description: "Every good beside has a box of tissues. Never run out with reusable tissues. A must for all sleepers with allergies.",
          price: "$1500"
        }
      ]
    });
  });
});
