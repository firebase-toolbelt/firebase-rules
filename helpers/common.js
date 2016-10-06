/**
 * 
 * Common firebase rules
 * 
 */

const jsonArr = require('../src/_utils/jsonArr');

module.exports = {

  /**
   * Auth
   */

  isAuth: 'auth.uid != null',
  valueIsAuthId: (value) => `auth.uid == ${value}`,

  /**
   * Value
   */
  
  data: 'data.val()',
  newData: 'newData.val()',
  valueIsData: (value) => `data.val() == ${value}`,
  valueIsNewData: (value) => `newData.val() == ${value}`,

  /**
   * Exists
   */

  newDataExists: 'newData.val() != null',
  newDataDoesNotExists: 'newData.val() == null',

  dataExists: 'data.val() != null',
  dataDoesNotExists: 'data.val() == null',

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

  hasChildren: (children) => `hasChildren(${jsonArr(children)})`,
  dataHasChildren: (children) => `data.hasChildren(${jsonArr(children)})`,
  newDataHasChildren: (children) => `newData.hasChildren(${jsonArr(children)})`,

  /**
   * NewData
   */
  
  toNewData: (condition) => condition.replace(/data./g, 'newData.'),
  toNewRoot: (condition) => condition.replace(/root./g, 'newDataRoot().'),

};
