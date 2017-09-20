const liftFunction = require('./liftFunction');

test('liftFunction - when passed a normal value - it should execute the first function at once', () => {
  const result = liftFunction(x => x + 1)(1);
  expect(result).toBe(2);
});

test('liftFunction - when passed a function value - it should execute the first function on the result of the passed function', () => {
  const result = liftFunction(x => x + 1)(() => 1);
  expect(typeof result === 'function').toBe(true);
  expect(result()).toBe(2);
});
