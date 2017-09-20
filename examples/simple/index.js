const { exportRules } = require('firebase-rules');

exportRules([
  require('./modules/users'),
  require('./modules/posts')
], 'database.rules.json');
