module.exports = function getRelativeRoot(depth) {
  let rootStr = '';
  for (var i = 0; i < depth + 1; i++) {
    rootStr += 'parent().';
  }
  return rootStr;
};
