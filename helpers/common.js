/**
 * Common firebase rules
 */

const jsonArr = require('./jsonArr');

module.exports = {

  /**
   * Auth
   */

  isAuth: 'auth.uid !== null',
  valueIsAuthUserId: (value) => `auth.uid === ${value}`,

  /**
   * Val
   */
  
  dataVal: 'data.val()',
  newDataVal: 'newData.val()',
  valueIsDataVal: (value) => `data.val() === ${value}`,
  valueIsNewDataVal: (value) => `newData.val() === ${value}`,

  /**
   * Exists
   */

  newDataExists: 'newData.val() !== null',
  newDataDoesNotExists: 'newData.val() === null',

  dataExists: 'data.val() !== null',
  dataDoesNotExists: 'data.val() === null',

  /**
   * Strings
   */

  dataIsString: 'data.isString()',
  newDataIsString: 'newData.isString()',

  /**
   * Numbers
   */

  dataIsNumber: 'data.isNumber()',
  newDataNumber: 'newData.isNumber()',

  /**
   * Booleans
   */

  dataIsBoolean: 'data.isBoolean()',
  newDataIsBoolean: 'newData.isBoolean()',

  /**
   * Numbers
   */

  dataIsNumber: 'data.isNumber()',
  newDataIsNumber: 'newData.isNumber()',

  /**
   * Children
   */

  dataHasChildren: (children) => `data.hasChildren(${jsonArr(children)})`,
  newDataHasChildren: (children) => `newData.hasChildren(${jsonArr(children)})`,

};
