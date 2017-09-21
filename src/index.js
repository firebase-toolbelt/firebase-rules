const { buildRules } = require('./utils/buildRules');
const jsonfile = require('jsonfile-promised');
const path = require('path');

module.exports = function createRules(_rules, filepath) {
  const rules = buildRules(_rules);
  return (path)
    ? jsonfile.writeFile(path.resolve(process.cwd(), filepath), rules, { spaces: 2 }).catch(console.log)
    : rules;
}
