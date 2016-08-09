function calculateCartTotal(ary) {
  ary = ary.reduce(function(a, b) { return a + b; }, 0);

  return ary;
}

module.exports = calculateCartTotal;
