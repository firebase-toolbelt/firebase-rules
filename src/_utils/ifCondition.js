
module.exports = function if(condition, trueOperation, elseOperation) {
  if (!condition || !trueOperation) {
    throw new Error('firebase-rules: ifCondition must receive at least a condition and a operation.');
  } else {
    return `(${condition}) ? (${trueOperation}) : (${elseOperation || false})`;
  }
};
