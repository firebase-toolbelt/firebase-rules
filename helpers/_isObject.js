/**
 * 
 * Check if a given value is an object.
 * This approach prevents arrays from being detected as objects.
 * 
 */

module.exports = function _isObject(value) {
  return value && value.constructor && value.constructor === Object;
}
