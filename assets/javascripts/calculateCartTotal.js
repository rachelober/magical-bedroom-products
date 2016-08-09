function calculateCartTotal(ary) {
  return ary.reduce(function(a, b) { return a + b; }, 0);
}

module.exports = calculateCartTotal;
