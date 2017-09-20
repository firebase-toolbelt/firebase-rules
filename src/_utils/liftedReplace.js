const replace = require('lodash/fp/replace');
const lift = require('./liftFunction');

module.exports = function liftReplace(substr, newSubstr) {
  return lift(replace(substr, newSubstr));
}
