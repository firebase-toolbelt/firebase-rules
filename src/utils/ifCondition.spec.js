const ifCondition = require('./ifCondition');

test('ifCondition - should create ternary strings', () => {
  const result = ifCondition('a == b', 'true', 'false');
  expect(result).toBe('((a == b) ? (true) : (false))');
});
