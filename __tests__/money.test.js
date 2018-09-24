const { Money, Bank, Sum } = require('../lib/money')

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

test('plus return sum', () => {
  const five = Money.dollar(5)
  const result = five.plus(five)
  const sum = result // jsにキャストは無いのでただの代入

  expect(sum.augend).toEqual(five)
  expect(sum.addend).toEqual(five)
});

test('reduce sum', () => {
  const sum = new Sum(Money.dollar(3), Money.dollar(4))
  const bank = new Bank()
  const result = bank.reduce(sum, "USD")

  expect(result).toEqual(Money.dollar(7))
});

test('reduce money', () => {
  const bank = new Bank()
  const result = bank.reduce(Money.dollar(1), "USD")
  
  expect(result).toEqual(Money.dollar(1))
});

test('reduce money different currency', () => {
  const bank = new Bank()
  bank.addRate("CHF", "USD", 2)
  const result = bank.reduce(Money.franc(2), "USD")

  expect(result).toEqual(Money.dollar(1))
});

test('identity rate', () => {
  const bank = new Bank()
  expect(bank.rate("USD", "USD")).toBe(1)
});