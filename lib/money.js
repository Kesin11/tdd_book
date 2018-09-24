class Money {
  constructor (amount, currency) {
    this._amount = amount
    this._currency = currency
  }

  static dollar(amount) {
    return new Dollar(amount, "USD")
  }

  static franc(amount) {
    return new Franc(amount, "CHF")
  }

  times (multiplier) {
    return new Money(this._amount * multiplier, this._currency)
  }

  currency () {
    return this._currency
  }
}

class Dollar extends Money {
}

class Franc extends Money {
}

module.exports = { Money, Dollar, Franc }
