const { anyCondition, everyConditions, ifCondition } = require('./src/conditions');
const { createRules, mergeRules } = require('./src/rules');
const exportRules = require('./src/export');

module.exports = {
  anyCondition,
  everyConditions,
  createRules,
  mergeRules,
  exportRules,
  ifCondition
};
