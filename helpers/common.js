/**
 * 
 * Common firebase rules
 * 
 */

const jsonArr = require('../src/_utils/jsonArr');
const curriedReplace = require('../src/_utils/curriedReplace');

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
  dataIsInteger: 'data.val().matches(/^-?\d+$/)',
  newDataIsInteger: 'newData.val().matches(/^-?\d+$/)',

  /**
   * Booleans
   */

  dataIsBoolean: 'data.isBoolean()',
  newDataIsBoolean: 'newData.isBoolean()',

  /**
   * Children
   */

  hasChildren: (children) => `hasChildren(${jsonArr(children)})`,
  dataHasChildren: (children) => `data.hasChildren(${jsonArr(children)})`,
  newDataHasChildren: (children) => `newData.hasChildren(${jsonArr(children)})`,

  /**
   * NewData
   */
  
  toNewData: curriedReplace(/data./g, 'newData.'),
  toNewRoot: curriedReplace(/root./g, 'newDataRoot().'),

};
