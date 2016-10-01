/**
 *
 * Transforms a ruleset into a firebase rules file.
 * 
 */

const jsonfile = require('jsonfile-promised');
const { mergeRules } = require('./rules');

module.exports = function exportRules(rules, path) {
  if (!path) { path = process.cwd() + '/database.rules.json'; }
  if (rules.constructor === Array) { rules = mergeRules(rules); }
  return jsonfile.writeFile(path, { rules }, { spaces: 2 }).catch(console.log);
}
