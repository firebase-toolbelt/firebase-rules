const createRules = require('../src/');

createRules({
  ...require('./modules/users'),
  ...require('./modules/posts')
}, 'database.rules.json');
