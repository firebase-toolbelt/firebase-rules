/**
 *
 * Increases the readability of the ternary operator.
 *
 * e.g.
 * '/users/$userId/': {
 *   read: {
 *     ifCondition(
 *       userIsAuth,
 *       valueIsAuthUserId('$userId')
 *     )
 *   }
 * }
 * 
 */

module.exports = function ifCondition(condition, trueOperation, elseOperation) {
  if (!condition || !trueOperation) {
    throw new Error('firebase-rules: ifCondition must receive at least a condition and a operation.');
  } else if (Array.from(arguments).length > 3) {
    throw new Error('firebase-rules: ifCondition is receiving too many arguments.');
  } else {
    return `(${condition}) ? (${trueOperation}) : (${elseOperation || false})`;
  }
};
