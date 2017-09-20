/**
 * Increased readibility for common conditional operators.
 */

const mergeConditions = require('../src/_utils/mergeConditions');
const ifCondition = require('../src/_utils/ifCondition');

module.exports = {
  ifCondition: ifCondition,
  anyCondition: mergeConditions('||'),
  everyCondition: mergeConditions('&&')
};
