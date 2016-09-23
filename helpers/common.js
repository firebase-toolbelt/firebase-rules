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

  dataHasChildren: (children) => `data.hasChildren(${jsonArr(children)})`,
  newDataHasChildren: (children) => `newData.hasChildren(${jsonArr(children)})`,

};
