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

  times (multiplier) { }

  currency () {
    return this._currency
  }
}

class Dollar extends Money {
  times (multiplier) {
    return Money.dollar(this._amount * multiplier)
  }
}

class Franc extends Money {
  times (multiplier) {
    return Money.franc(this._amount * multiplier)
  }
}

module.exports = { Money, Dollar, Franc }
