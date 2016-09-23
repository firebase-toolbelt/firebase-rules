const { anyCondition, everyConditions, createRules, exportRules } = require('../../index');
const { isAuth, valueIsAuthUserId, dataExists, dataDoesNotExists, newDataHasChildren } = require('../../helpers/common');

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
  }
});

console.log(userRules);

exportRules(userRules, __dirname + '/user.json');
