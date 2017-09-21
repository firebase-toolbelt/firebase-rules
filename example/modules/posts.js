const {
  isAuth,
  isAuthId,
  newData,
  newProp,
  hasChildren,
  isString,
  isNow,
  validate
} = require('../../helpers/common');

module.exports = {
  'posts/$postId': {
    read: isAuth,
    write: isAuthId(newProp('createdBy')),
    validate: hasChildren(['title', 'body', 'createdAt', 'createdBy'])
  },
  'posts/$postId/title': validate(isString),
  'posts/$postId/body': validate(isString),
  'posts/$postId/createdAt': validate(isNow),
  'posts/$postId/createdBy': validate(isAuthId(newData)),
  'posts/$postId/$invalidProp': validate(false)
};
