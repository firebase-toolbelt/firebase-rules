/**
 *
 * Transforms a ruleset into a firebase rules file.
 * 
 */

const path = require('path');
const jsonfile = require('jsonfile-promised');
const { mergeRules } = require('./rules');

jsonfile.spaces = 2;

module.exports = function exportRules(rules, exportPath) {
  if (!exportPath) { exportPath = path.join(__dirname, 'database.rules.json'); }
  if (rules.constructor === Array) { rules = mergeRules(rules); }
  return jsonfile.writeFile(path, { rules });
}
