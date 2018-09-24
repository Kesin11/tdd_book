const { Money, Bank } = require('../lib/money')

test('multiplication', () => {
  const five = Money.dollar(5)

  expect(five.times(2)).toEqual(Money.dollar(10))
  expect(five.times(3)).toEqual(Money.dollar(15))
});

test('equality', () => {
  expect(Money.dollar(5)).toEqual(Money.dollar(5))
  expect(Money.dollar(5)).not.toEqual(Money.dollar(6))

  expect(Money.franc(5)).not.toEqual(Money.dollar(5))
  // jsにはクラス自身にeqalsメソッドを定義できないので、区別するためのプロパティを追加するしかない
});

test('franc multiplication', () => {
  const five = Money.franc(5)

  expect(five.times(2)).toEqual(Money.franc(10))
  expect(five.times(3)).toEqual(Money.franc(15))
});

test('currency', () => {
  expect(Money.dollar(1).currency()).toBe("USD")
  expect(Money.franc(1).currency()).toBe("CHF")
});

test('simple addition', () => {
  const five = Money.dollar(5)
  const sum = five.plus(five)
  const bank = new Bank()
  const reduced = bank.reduce(sum, "USD")
  expect(reduced).toEqual(Money.dollar(10))
});