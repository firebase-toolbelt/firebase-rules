const {
  isAuth,
  isAuthId,
  isString,
  newDataExists,
  hasChildren,
  validate
} = require('../../helpers/common');
const { ifCondition } = require('../..//helpers/conditions');

const isUserAndIsNotRemoving = ifCondition(
  newDataExists,
  isAuthId('$userId'),
  false
);

module.exports = {
  'users/$userId': {
    read: isAuth,
    write: isUserAndIsNotRemoving,
    validate: hasChildren(['firstName'])
  },
  'users/$userId/firstName': validate(isString),
  'users/$userId/$invalidProp': validate(false)
};
