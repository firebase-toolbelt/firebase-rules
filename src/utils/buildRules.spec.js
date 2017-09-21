const {
  _toParsedPairs,
  _parseRuleValue,
  _toParsedRules
} = require('./buildRules');

test('toParsedPairs - it should optionally accept a leading / before the path', () => {
  
  const result = _toParsedPairs([
    ['my/path', { validate: true }],
    ['/my/other/path', { validate: true }]
  ]);

  expect(result.map((x) => x[0])).toEqual([
    ['my', 'path'],
    ['my', 'other', 'path']
  ]);

});

test('parseRuleValue - it should replace newDataRoot with regards to the passed pathArr length', () => {
  
  const pathArrA = ['a', 'b', 'c'];
  const pathArrB = ['a', 'b', 'c', 'd', 'e'];
  const pathValue = 'newDataRoot().exists()';

  const resultA = _parseRuleValue(pathArrA)(pathValue);
  const resultB = _parseRuleValue(pathArrB)(pathValue);
  
  expect(resultA).toMatch('newData.parent().parent().parent().exists()');
  expect(resultB).toMatch('newData.parent().parent().parent().parent().parent().exists()');

});

test('toParsedRules - it should construct a rules object with the expected structure', () => {
  
  const path = ['a', 'b', 'c', 'd', 'e'];
  const validate = ['.validate', 'data.isString()'];
  const read = ['.read', 'auth.uid != null'];

  const unparsedRules = [[path, [validate, read]]];

  const result = _toParsedRules(unparsedRules);

  expect(result).toEqual({
    rules: {
      a: {
        b: {
          c: {
            d: {
              e: {
                '.validate': 'data.isString()',
                '.read': 'auth.uid != null'
              }
            }
          }
        }
      }
    }
  });

});
