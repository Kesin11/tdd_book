interface Expression {
  times(multiplier: number): Expression
  plus(addend: Expression): Expression
  reduce(bank: Bank, to: Currency): Money
}

type Currency = "USD" | "CHF"

export class Money implements Expression {
  amount: number
  protected _currency: Currency

  constructor (amount: number, currency: Currency) {
    this.amount = amount
    this._currency = currency
  }

  static dollar(amount: number) {
    return new Money(amount, "USD")
  }

  static franc(amount: number) {
    return new Money(amount, "CHF")
  }

  times (multiplier: number): Expression {
    return new Money(this.amount * multiplier, this._currency)
  }

  plus (addend: Expression): Expression {
    return new Sum(this, addend)
  }

  currency () {
    return this._currency
  }

  reduce(bank: Bank, to: Currency) {
    const rate = bank.rate(this.currency(), to)
    if (rate === undefined) return new Money(0, to)

    return new Money(this.amount / rate, to)
  }
}

export class Bank {
  private rates: Map<Pair, number>

  constructor () {
    this.rates = new Map()
  }

  reduce (source: Expression, to: Currency) {
    return source.reduce(this, to)
  }

  addRate (from: Currency, to: Currency, rate: number) {
    this.rates.set(Pair.toKey(from, to), rate)
  }

  rate (from: Currency, to: Currency) {
    if (from === to) return 1
    return this.rates.get(Pair.toKey(from, to))
  }
}

export class Sum {
  augend: Expression
  addend: Expression

  constructor (augend: Expression, addend: Expression) {
    this.augend = augend
    this.addend = addend
  }

  times (multiplier: number): Expression {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier))
  }

  plus (addend: Expression): Expression {
    return new Sum(this, addend)
  }

  reduce (bank: Bank, to: Currency) {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount
    return new Money(amount, to)
  }
}

class Pair {
  // jsではobjectをMapのキーにしたときのハッシュ値計算を自分で定義することができないため、
  // 自前のtoKey()で代用する
  static toKey (from: Currency, to: Currency) {
    return from + to
  }
}