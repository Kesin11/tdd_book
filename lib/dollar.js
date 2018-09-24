class Dollar {
  constructor (amount) {
    this._amount = amount
  }
  times (multiplier) {
    return new Dollar(this._amount * multiplier)
  }
}

class Franc {
  constructor (amount) {
    this._amount = amount
  }
  times (multiplier) {
    return new Franc(this._amount * multiplier)
  }
}

module.exports = { Dollar, Franc }
