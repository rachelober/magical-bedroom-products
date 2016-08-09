jest.unmock('../calculateCartTotal');

describe('calculateCartTotal', () => {
  it('adds up an array of numbers', () => {
    const calculateCartTotal = require('../calculateCartTotal');
    expect(calculateCartTotal([2000, 1500])).toBe(3500);
  });
});
