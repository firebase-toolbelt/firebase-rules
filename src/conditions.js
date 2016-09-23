const mergeConditions = require('./_utils/mergeConditions');

module.exports = {
  anyCondition: mergeConditions(' || '),
  everyConditions: mergeConditions(' && ')
};
