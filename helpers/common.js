/**
 * Common firebase rules
 */

const arrToJsonStr = require('./_arrToJsonStr');

module.exports = {

  /**
   * Auth
   */

  isAuth: 'auth.uid !== null',
  valueIsAuthUserId: (value) => `auth.uid === ${value}`,

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

  dataIsString: 'data.val().isString()',
  newDataIsString: 'newData.val().isString()',

  /**
   * Children
   */

  dataHasChildren: (children) => `data.hasChildren(${arrToJsonStr(children)})`,
  newDataHasChildren: (children) => `newData.hasChildren(${arrToJsonStr(children)})`,

}
