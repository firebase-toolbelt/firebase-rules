const {
  isAuth,
  isAuthId,
  isString,
  hasChildren,
  validate
} = require('firebase-rules/helpers/common');
const { ifCondition } = require('firebase-rules/helpers/conditions');

const isUserAndIsNotRemoving = ifCondition(
  newDataExists,
  isAuthId('$userId'),
  false
);

const userRules = {
  'users/$userId': {
    read: isAuth,
    write: isUserAndIsNotRemoving,
    validate: hasChildren(['firstName'])
  },
  'users/$userId/firstName': validate(isString),
  'users/$userId/$invalidProp': validate(false)
};
