const lift = require('./liftFunction');

const replaceMultiple = replacements => target => (
  replacements.reduce((acc, args) => {
    return acc.replace(args[0], args[1]);
  }, target)
);

module.exports = function liftedReplace(replacements) {
  return lift(replaceMultiple(replacements));
}
