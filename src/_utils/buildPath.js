const validRulesKeys = require('../_constants/validRulesKeys');
const getRelativeRoot = require('./getRelativeRoot');

module.exports = function buildPath(targetObj, path, values, pathArr, curPathIdx, pathObj) {
  
  pathArr = pathArr || path.split('/');
  pathObj = pathObj || targetObj;
  curPathIdx = curPathIdx || 0;
  
  const curPathKey = pathArr[curPathIdx];
  if (!pathObj[curPathKey]) { pathObj[curPathKey] = {}; }
  
  pathObj = pathObj[curPathKey];
  
  if (curPathIdx < pathArr.length - 1) {
    return buildPath(targetObj, path, values, pathArr, curPathIdx + 1, pathObj);
  }
  
  const valueKeys = Object.getOwnPropertyNames(values);
  valueKeys.forEach((valueKey) => {
    if (!validRulesKeys[valueKey]) { return; }
      
    const valueKeyRules = values[valueKey].toString();
    const finalValueKey = `.${valueKey}`;
    const relativeRootStr = 'newDataRoot().';
    
    if (valueKeyRules.indexOf(relativeRootStr) !== -1) {
      const relativeRoot = getRelativeRoot(curPathIdx);
      pathObj[finalValueKey] = valueKeyRules.replace(relativeRootStr, relativeRoot);
    } else {
      pathObj[finalValueKey] = valueKeyRules;
    }
    
  });
  
  return targetObj;
  
}
