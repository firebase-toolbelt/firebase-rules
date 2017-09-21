/**
 *
 * Construct valid json rules object based on passed object.
 * It also uses adds the functionality to use `newDataRoot().` as a variable.
 * 
 */

const map = require('lodash/fp/map');
const reduce = require('lodash/fp/reduce');
const filter = require('lodash/fp/filter');
const set = require('lodash/fp/set');
const pipe = require('lodash/fp/flow');
const toPairs = require('lodash/fp/toPairs');

const validRulesKeys = require('../constants/validRulesKeys');
const getRelativeRoot = require('./getRelativeRoot');

/**
 * type UnparsedRules
 * {
 *   "path/as/string": {
 *     "ruleKeyWithoutDot": "unparsedRuleString"
 *   }
 * }
 * 
 * type RulePairs
 * [
 *   ["path/as/string", { "ruleKeyWithoutDot": "unparsedRuleString" }]
 * ]
 * 
 * type RuleParsedPairs
 * [
 *   [
 *     ["path, "as, "string"],
 *     [["validRuleKeyWithDot", "parsedRuleString"]]
 *   ]
 * ]
 * 
 * type ParsedRules
 * {
 *   "rules": {
 *     "path": {
 *       ".ruleKey": "parsedRuleString"
 *     }
 *   }
 * }
 * 
 * type UnparsedPathRules
 * ["maybeValidRuleKeyWithoutDot", "unparsedRuleString"]
 * 
 * type ParsedPathRules
 * ["validRuleKeyWithoutDot", "parsedRuleString"]
 * 
 */

const trace = x => {
  console.log(x);
  return x;
};

// parsePathRules : UnparsedPathRules -> ParsedPathRules
const parsePathRules = pathArr => pipe([
  toPairs,
  filter((entry) => validRulesKeys.indexOf(entry[0]) !== -1),
  trace,
  map((entry) => {
    const parsedKey = `.${entry[0]}`;
    const relativeRootStr = 'newDataRoot().';
    const relativeRoot = getRelativeRoot(pathArr);
    const parsedRule = entry[1].toString().replace(/newDataRoot\(\)\./g, relativeRoot);
    return [
      parsedKey,
      parsedRule
    ];
  })
]);

// buildRules : UnparsedRules : ParsedRules
const buildRules = pipe([
  
  // UnparsedRules -> RulePairs
  toPairs,
  
  // RulePairs -> RuleParsedPairs
  map((entry) => {
    const pathArr = entry[0].split('/');
    return [
      pathArr,
      parsePathRules(pathArr)(entry[1])
    ];
  }),

  // RuleParsedPairs -> ParsedRules
  reduce((acc, pathRules) => {
    return reduce((acc, entry) => {
      return set(['rules'].concat(pathRules[0], entry[0]), entry[1], acc);
    }, acc, pathRules[1]);
  }, { rules: {} }),

]);

module.exports = buildRules;
