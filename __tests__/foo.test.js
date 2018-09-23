const { Foo } = require('../lib/foo')

test('should ', () => {
  const foo = new Foo(1)
  foo.add(1)
  expect(foo.foo).toBe(2)
})