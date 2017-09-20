/**
 * Utils
 */

const liftedReplace = require('../src/utils/liftedReplace');
const jsonArr = require('../src/utils/jsonArr');

/**
 * JSON String helpers
 */

exports.s = (x) => `\'${x}\'`;

/**
 * Transformers
 */

const toData = liftedReplace([['newData.', 'data.'], ['newDataRoot().', 'root.']]);
const toNewData = liftedReplace([['data.', 'newData.'], ['root.', 'newDataRoot().']]);

exports.toData = toData;
exports.toNewData = toNewData;

/**
 * Auth
 */

exports.isAuth = 'auth.uid != null';
exports.isAuthId = value => `auth.uid == ${value}`;

/**
 * Data
 */

const data = 'data.val()';
const isData = value => `data.val() == ${value}`;

const dataExists = 'data.val() != null';
const dataIsEmpty = 'data.val() == null';

exports.data = data;
exports.isData = isData;
exports.dataExists = dataExists;
exports.dataIsEmpty = dataIsEmpty;

exports.newData = toNewData(data);
exports.isNewData = toNewData(isData);
exports.newDataExists = toNewData(dataExists);
exports.newDataIsEmpty = toNewData(dataIsEmpty);

/**
 * Props / Children
 */

const prop = propName => `data.child(\'${propName}\'`;
const newProp = toNewData(prop);

exports.prop = prop;
exports.child = prop;

exports.newProp = newProp;
exports.newChild = newProp;

const hasProps = children => `newData.hasChildren(${jsonArr(children)})`;

exports.hasProps = hasProps;
exports.hasChildren = hasProps;

/**
 * Validation
 */

exports.isString = 'newData.isString()';
exports.isNumber = 'newData.isNumber()';
exports.isInteger = 'newData.val().matches(/^-?d+$/)';
exports.isBoolean = 'newData.isBoolean()';
exports.isNow = 'newData.val() == now';

/**
 * Validate Short-hand
 */

exports.validate = condition => ({ validate: condition });
