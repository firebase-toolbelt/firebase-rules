const createRules = require('../../src/rules');
const { anyCondition, everyConditions } = require('../../src/conditions');
const { isAuth, valueIsAuthUserId, dataExists, dataDoesNotExists, newDataHasChildren } = require('../../helpers/common');
const exportRules = require('../../src/export');

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

exportRules(userRules);
