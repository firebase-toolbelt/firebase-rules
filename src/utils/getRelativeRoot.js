/**
 *
 * Calculate the number of parents needed to reach the newData root path.
 * 
 */

module.exports = function getRelativeRoot(depth) {
  let rootStr = 'newData.';
  for (var i = 0; i < depth + 1; i++) { rootStr += 'parent().'; }
  return rootStr;
};
