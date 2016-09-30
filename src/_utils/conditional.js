module.exports = function conditional(condition, allowedConditionAction, deniedConditionAction) {
  const args = Array.from(arguments);
  if (args.length < 3) { throw new Error('firebase-rules: conditional must receive three condition.') }
  return `((${condition}) ? ${allowedConditionAction} : ${deniedConditionAction})`;
};