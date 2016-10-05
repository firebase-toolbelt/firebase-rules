/**
 *
 * Common CRUD operation conditionals.
 * 
 */

const { dataDoesNotExists, dataExists, newDataExists, newDataDoesNotExists } = require('../../helpers/common');
const { everyConditions } = require('../../helpers/conditions');

function onCreate(condition) {
  return everyConditions(
    dataDoesNotExists,
    condition
  );
}

function onUpdate(condition) {
  return everyConditions(
    everyConditions(dataExists, newDataExists)
    condition
  );
}

function onDelete(condition) {
  return everyConditions(
    everyConditions(dataExists, newDataDoesNotExists)
    condition
  );
}

module.exports = {
  onCreate,
  onUpdate,
  onDelete
};
