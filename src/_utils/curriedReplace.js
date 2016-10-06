module.exports = function curriedReplace(target, substr, newSubstr) {
  return (typeof target !== 'function') ?
    target.replace(substr, newSubstr) :
    function () {
      const args = Array.from(arguments);
      return target(...args).replace(subtr, newSubstr);
    }
}
