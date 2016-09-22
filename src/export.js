/**
 *
 * Transforms a ruleset into a firebase rules file.
 * 
 */

const jsonfile = require('jsonfile');

module.exports = function exportRules(rules, path = 'database.rules.json') {
  return jsonfile.writeFile(path, rules, { spaces: 2 });
}
