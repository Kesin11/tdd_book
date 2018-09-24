const { Money, Bank, Sum } = require('../lib/money')
const assert = require('assert');

describe('Money', function() {
  context('basic', function() {
    it('muptiplication', () => {
      const five = Money.dollar(5)

      assert.deepEqual(five.times(2), Money.dollar(10))
      assert.deepEqual(five.times(3), Money.dollar(15))
    });

    it('equality', () => {
      assert.deepEqual(Money.dollar(5), Money.dollar(5))
      assert.notDeepEqual(Money.dollar(5), Money.dollar(6))
      assert.notDeepEqual(Money.franc(5), Money.dollar(5))
    });

    it('currency', () => {
      assert.equal(Money.dollar(1).currency(), "USD")
      assert.equal(Money.franc(1).currency(), "CHF")
    });

    it('addition', () => {
      const five = Money.dollar(5)
      const sum = five.plus(five)
      const bank = new Bank()
      const reduced = bank.reduce(sum, "USD")
      assert.deepEqual(Money.dollar(10), reduced)
    });

    it('plus return sum', () => {
      const five = Money.dollar(5)
      const result = five.plus(five)
      const sum = result // jsにキャストは無いのでただの代入

      assert.deepEqual(sum.augend, five)
      assert.deepEqual(sum.addend, five)
    });
  });
  context('reduce', function() {
    let bank
    beforeEach(function() {
      bank = new Bank()
    })

    it('sum', () => {
      const sum = new Sum(Money.dollar(3), Money.dollar(4))
      const result = bank.reduce(sum, "USD")

      assert.deepEqual(result, Money.dollar(7))
    });

    it('money', () => {
      const sum = new Sum(Money.dollar(3), Money.dollar(4))
      const result = bank.reduce(Money.dollar(1), "USD")

      assert.deepEqual(result, Money.dollar(1))
    });

    it('reduce money different currency', () => {
      bank.addRate("CHF", "USD", 2)
      const result = bank.reduce(Money.franc(2), "USD")

      assert.deepEqual(result, Money.dollar(1))
    });
  });

  context('different currency', function() {
    let bank
    let fiveBucks
    let tenFrancs
    beforeEach(function() {
      bank = new Bank()
      bank.addRate("CHF", "USD", 2)
      fiveBucks = Money.dollar(5)
      tenFrancs = Money.franc(10)
    })

    it('identity rate', () => {
      assert.equal(bank.rate("USD", "USD"), 1)
    });

    it('addition', () => {
      const result = bank.reduce(fiveBucks.plus(tenFrancs), "USD")

      assert.deepEqual(result, Money.dollar(10))
    });

    it('sum plus money', () => {
      const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks)
      const result = bank.reduce(sum, "USD")
      
      assert.deepEqual(result, Money.dollar(15))
    });

    it('sum times', () => {
      const sum = new Sum(fiveBucks, tenFrancs).times(2)
      const result = bank.reduce(sum, "USD")

      assert.deepEqual(result, Money.dollar(20))
    });
  });
});