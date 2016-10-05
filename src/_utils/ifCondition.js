module.exports = function ifCondition(condition, allowedConditionAction, deniedConditionAction) {
  const args = Array.from(arguments);
  if (args.length < 2) { throw new Error('firebase-rules: ifCondition must receive three condition.') }
  return `((${condition}) ? ${allowedConditionAction} : ${deniedConditionAction || false})`;
};
