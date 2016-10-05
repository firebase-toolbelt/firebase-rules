const { dataDoesNotExists, dataExists, newDataExists, newDataDoesNotExists } = require('./common');
const { everyConditions } = require('./conditions');

function onCreate(condition) {
  return everyConditions(
    dataDoesNotExists,
    condition
  );
}

function onUpdate(condition) {
  return everyConditions(
    everyConditions(dataExists, newDataExists),
    condition
  );
}

function onDelete(condition) {
  return everyConditions(
    everyConditions(dataExists, newDataDoesNotExists),
    condition
  );
}

module.exports = {
  onCreate,
  onUpdate,
  onDelete
};
