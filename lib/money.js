class Money {
  constructor (amount, currency) {
    this.amount = amount
    this._currency = currency
  }

  static dollar(amount) {
    return new Money(amount, "USD")
  }

  static franc(amount) {
    return new Money(amount, "CHF")
  }

  times (multiplier) {
    return new Money(this.amount * multiplier, this._currency)
  }

  plus (addend) {
    return new Sum(this, addend)
  }

  currency () {
    return this._currency
  }

  reduce(to) {
    return this
  }
}

class Bank {
  constructor () { }
  reduce (source, to) {
    return source.reduce(to)
  }
}

class Sum {
  constructor (augend, addend) {
    this.augend = augend
    this.addend = addend
  }

  reduce (to) {
    const amount = this.augend.amount + this.addend.amount
    return new Money(amount, to)
  }
}

module.exports = { Money, Bank, Sum }
