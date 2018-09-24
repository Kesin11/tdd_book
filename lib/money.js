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

  reduce(bank, to) {
    const rate = bank.rate(this.currency(), to)
    return new Money(this.amount / rate, to)
  }
}

class Bank {
  constructor () {
    this.rates = new Map()
  }
  reduce (source, to) {
    return source.reduce(this, to)
  }

  addRate (from, to, rate) {
    this.rates.set(Pair.toKey(from, to), rate)
  }

  rate (from, to) {
    if (from === to) return 1
    return this.rates.get(Pair.toKey(from, to))
  }
}

class Sum {
  constructor (augend, addend) {
    this.augend = augend
    this.addend = addend
  }

  times (multiplier) {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier))
  }

  plus (addend) {
    return new Sum(this, addend)
  }

  reduce (bank, to) {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount
    return new Money(amount, to)
  }
}

class Pair {
  // jsではobjectをMapのキーにしたときのハッシュ値計算を自分で定義することができないため、
  // 自前のtoKey()で代用する
  static toKey (from, to) {
    return from + to
  }
}

module.exports = { Money, Bank, Sum }
