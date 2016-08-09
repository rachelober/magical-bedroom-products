jest.unmock('../priceInt');

describe('priceInt', () => {
  it('creates a string with a $ in it', () => {
    const priceInt = require('../priceInt');
    expect(priceInt("$200")).toBe(200);
  });
});
