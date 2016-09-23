const isObject = require('./isObject');

module.exports = function isArrayOfObjects(value) {
  return value && value.filter && value.filter((rule) => !isObject(rule)).length);
};
