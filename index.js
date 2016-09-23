const { anyCondition, everyConditions } = require('./src/conditions');
const { createRules, mergeRules } = require('./src/rules');
const exportRules = require('./src/export');

module.exports = {
  anyCondition,
  everyConditions,
  createRules,
  mergeRules,
  exportRules
};
