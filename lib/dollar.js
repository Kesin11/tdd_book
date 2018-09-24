class Money {
  constructor () {
    this._amount = undefined
  }
}

class Dollar extends Money {
  constructor (amount) {
    super()
    this._amount = amount
  }
  times (multiplier) {
    return new Dollar(this._amount * multiplier)
  }
}

class Franc extends Money {
  constructor (amount) {
    super()
    this._amount = amount
  }
  times (multiplier) {
    return new Franc(this._amount * multiplier)
  }
}

module.exports = { Dollar, Franc }
