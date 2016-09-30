const mergeConditions = require('./_utils/mergeConditions');
const conditional = require('./_utils/conditional');

module.exports = {
  anyCondition: mergeConditions(' || '),
  everyConditions: mergeConditions(' && '),
  conditional: conditional
};
