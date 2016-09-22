/**
 *
 * IN DEVELOPMENT
 *
 * Will merge rulesets and transpose special keys into valid rule paths.
 * 
 */

const _isObject = require('../helpers/_isObject');

module.exports = function createRules() {
  const args = Array.from(arguments);
  if (!args.length || args.filter((rule) => !_isObject(rule)).length) { throw new Error('firebase-rules: "createRules" can only receive objects as arguments.'); }
  return {
    rules: args.reduce((acc, rule) => Object.assign(acc, rule), {})
  };
}
