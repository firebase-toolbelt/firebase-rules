/**
 *
 * Simply merge condition strings with a custom separator.
 * 
 * e.g.
 * mergeCondition(' %% ')('cond1') => '(cond1)'
 * mergeCondition(' %% ')('cond1', 'cond2') => '(cond1) %% (cond2)'
 * 
 */

module.exports = function mergeConditions(separator) {
  if (!separator) { throw new Error('firebase-rules: mergeConditions must receive a separator.'); }
  return function () {
    let args = Array.from(arguments);
    if (args[0] && args[0].constructor === Array) { args = args[0]; }
    if (args.length < 1) { throw new Error('firebase-rules: mergeConditions must receive at least one condition.'); }
    return args.reduce((acc, condition, index) => {
      return (index < args.length - 1) ? acc + `(${condition})` + separator : acc + `(${condition})`;
    }, '');
  };
}
