const liftedReplace = require('./liftedReplace');

test('liftedReplace - it should apply multiple replacements', () => {
  expect(
    liftedReplace([['a', 'x'], ['b', 'x']])('ab')
  ).toEqual('xx');
});

test('liftedReplace - it should work with functions', () => {
  expect(
    liftedReplace([['a', 'x'], ['b', 'x']])('ab')
  ).toEqual('xx');
});
