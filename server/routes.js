/**
 * Main application routes
 */

'use strict';

var path = require('path');
var error = require('./components/error');

module.exports = function(app) {

  // Insert routes below
  app.use('/api', require('./controllers/game'));
  app.use('/api', require('./controllers/user'));
  app.use('/api', require('./controllers/client'));
  app.use('/', require('./controllers/oauth2'));

  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(error[404]);

  // All other routes should redirect to the index.html
  // app.route('/*')
  //   .get(function(req, res) {
  //     res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  //   });

    app.get('/', function(req, res) {
      //res.send('Hello World!');
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
