const mergeConditions = require('./_utils/mergeConditions');
const ifCondition = require('./_utils/ifCondition');

module.exports = {
  anyCondition: mergeConditions(' || '),
  everyConditions: mergeConditions(' && '),
  ifCondition: ifCondition
};
