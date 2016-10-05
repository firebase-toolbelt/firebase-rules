const { createRules, exportRules } = require('../../index');
const { anyCondition, everyConditions } = require('../../helpers/conditions');
const { isAuth, valueIsAuthUserId, dataExists, dataDoesNotExists, newDataHasChildren } = require('../../helpers/common');
const { onCreate, onUpdate, onDelete } = require('../../helpers/crud');

const userRules = createRules({
  "users/$userId": {
    read: isAuth,
    write: valueIsAuthUserId('$userId'),
    validate: anyCondition(
      dataExists,
      everyConditions(
        dataDoesNotExists,
        newDataHasChildren(['firstName', 'displayName'])
      )
    )
  },
  "posts/$postId": {
    read: isAuth,
    write: anyCondition(
      onCreate(newDataHasChildren(['id', 'body', 'createdBy'])),
      onUpdate(newDataHasChildren(['body', 'updatedBy'])),
      onDelete(valueIsAuthUserId(`newData.child('createdBy').val()`))
    ),
    validate: `newDataRoot().child('users').child(auth.uid).exists()`
  }
});

exportRules(userRules, __dirname + '/user.json');
