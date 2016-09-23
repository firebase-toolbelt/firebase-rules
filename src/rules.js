const buildPath = require('./_utils/buildPath'); 

function createRules(rulesObj) {
  let rules = {};
  const pathKeys = Object.getOwnPropertyNames(rulesObj);
  pathKeys.forEach((pathKey) => buildPath(rules, pathKey, rulesObj[pathKey]));
  return rules;
};

function mergeRules(rulesArr = []) {
  return rulesArr.reduce((acc, rules) => Object.assign(acc, rules), {});
}

module.exports = {
  createRules,
  mergeRules
};
