/**
 *
 * Transforms a ruleset into a firebase rules file.
 * 
 */

const jsonfile = require('jsonfile');
const { mergeRules } = require('./rules');

jsonfile.spaces = 2;

module.exports = function exportRules(rules, path = 'database.rules.json') {
  if (rules.constructor === Array) { rules = mergeRules(rules); }
  return jsonfile.writeFile(path, { rules });
}
