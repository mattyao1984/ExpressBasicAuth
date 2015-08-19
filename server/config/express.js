/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jade = require('jade');
var passport = require('passport');
var compression = require('compression');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./index');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var Auth = require('../controllers/auth/auth.controller');

module.exports = function(app){
  var env = app.get('env');

  //Init passport
  app.use(passport.initialize());

  //Use jade as the template engine
  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.set('view cache', true);

  // Use the body-parser package in our application
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(compression());

  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: 'game-loader'
    })
  }));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
