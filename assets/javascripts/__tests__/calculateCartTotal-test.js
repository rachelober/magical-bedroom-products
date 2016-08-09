jest.unmock('../calculateCartTotal');

describe('calculateCartTotal', () => {
  it('adds up prices from a cart', () => {
    const calculateCartTotal = require('../calculateCartTotal');

    const cart = [ { price: "$1000" }, { price: "$2000" }, { price: "$1500" } ];

    expect(calculateCartTotal(cart)).toBe(0);
  });
});
