const { Dollar } = require('../lib/dollar')

test('multiplication', () => {
  const five = new Dollar(5)

  let product = five.times(2)
  expect(product.amount).toBe(10)

  product = five.times(3)
  expect(product.amount).toBe(15)
});

test('equality', () => {
  expect(new Dollar(5)).toEqual(new Dollar(5))
  expect(new Dollar(5)).not.toEqual(new Dollar(6))
});