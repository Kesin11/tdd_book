class Foo {
  constructor (foo) {
    this.foo = foo
  }

  add (x) {
    this.foo += x
  }
}

module.exports = {Foo}