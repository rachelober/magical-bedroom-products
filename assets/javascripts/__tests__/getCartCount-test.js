jest.unmock('../getCartCount');

describe('getCartCount', () => {
  it('counts how many items are in a cart', () => {
    const getCartCount = require('../getCartCount');
    expect(getCartCount()).toBe(3);
  });
});
