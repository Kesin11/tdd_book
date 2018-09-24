class Money {
  constructor () {
    this._amount = undefined
  }
}

class Dollar extends Money {
  constructor (amount) {
    super()
    this._amount = amount
    this._kind = 'dollar'
  }
  times (multiplier) {
    return new Dollar(this._amount * multiplier)
  }
}

class Franc extends Money {
  constructor (amount) {
    super()
    this._amount = amount
    this._kind = 'franc'
  }
  times (multiplier) {
    return new Franc(this._amount * multiplier)
  }
}

module.exports = { Dollar, Franc }
