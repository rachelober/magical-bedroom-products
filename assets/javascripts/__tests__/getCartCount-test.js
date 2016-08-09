jest.unmock('../getCartCount');

describe('getCartCount', () => {
  it('counts how many items are in a cart', () => {
    const getCartCount = require('../getCartCount');
    const cart = [
      {id: 1, name: "test", description: "test", price: "test"},
      {id: 2, name: "test", description: "test", price: "test"},
    ]
    expect(getCartCount(cart)).toBe(2);
  });
});
