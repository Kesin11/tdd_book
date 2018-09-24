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

  currency () {
    return this._currency
  }
}

module.exports = { Money }
