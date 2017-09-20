/**
 * Increased readibility for common conditional operators.
 */

const mergeConditions = require('../src/utils/mergeConditions');
const ifCondition = require('../src/utils/ifCondition');

module.exports = {
  ifCondition: ifCondition,
  anyCondition: mergeConditions('||'),
  everyCondition: mergeConditions('&&')
};
