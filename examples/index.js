const createRules = require('firebase-rules');

createRules({
  ...require('./modules/users'),
  ...require('./modules/posts')
}, 'database.rules.json');
