/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api', require('./app/controllers/game'));
  app.use('/api', require('./app/controllers/user'));
};
