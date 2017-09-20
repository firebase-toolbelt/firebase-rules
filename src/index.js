const buildPath = require('./utils/buildPath');
const jsonfile = require('jsonfile-promised');

module.exports = function createRules(_rules, path) {

  let rules = {};
  const pathKeys = Object.getOwnPropertyNames(rulesObj);
  pathKeys.forEach((pathKey) => buildPath(_rules, pathKey, rulesObj[pathKey]));
  rules = { rules };

  if (path) {
    return jsonfile.writeFile(process.cwd() + path, rules, { spaces: 2 }).catch(console.log);
  }

  return rules;

}
