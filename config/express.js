/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jade = require('jade');
var passport = require('passport');
var config = require('./index');
var Auth = require('../app/controllers/auth/auth.controller');

module.exports = function(app){
  //Init passport
  app.use(passport.initialize());

  //Use jade as the template engine
  app.set('views', config.root + '/app/views');
  app.set('view engine', jade);

  // Use the body-parser package in our application
  app.use(bodyParser.urlencoded({
    extended: true
  }));
};
