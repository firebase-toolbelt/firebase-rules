/**
 * 
 * Increasing readability of common condition wrappers.
 * 
 */

const mergeConditions = require('../src/_utils/mergeConditions');
const ifCondition = require('../src/_utils/ifCondition');

module.exports = {
  ifCondition: ifCondition,
  anyCondition: mergeConditions(' || '),
  everyConditions: mergeConditions(' && ')
};
