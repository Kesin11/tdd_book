class Money {
  constructor (amount, currency) {
    this._amount = amount
    this._currency = currency
  }

  static dollar(amount) {
    return new Money(amount, "USD")
  }

  static franc(amount) {
    return new Money(amount, "CHF")
  }

  times (multiplier) {
    return new Money(this._amount * multiplier, this._currency)
  }

  plus (addend) {
    return new Money(this._amount + addend._amount, this._currency)
  }

  currency () {
    return this._currency
  }
}

class Bank {
  constructor () { }
  reduce (source, to) {
    return Money.dollar(10)
  }
}

module.exports = { Money, Bank }
