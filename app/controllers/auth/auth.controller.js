'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../../models/user');
var Client = require('../../models/client');
var Token = require('../../models/token');

//Use basic stratey to authetication
passport.use(new BasicStrategy(
  function(username, password, callback){
    User.findOne({username: username}, function(err, user){
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));

//Use client basic stratey
passport.use('client-basic', new BasicStrategy(
  function(username, password, callback){
    Client.findOne({ id: username }, function(err, client){
      if(err)
        return callback(err);

      //No client or bad password
      if(!client || client.secret != password)
        return callback(null, false);

      return callback(null, client);
    });
  }
));

//Use bearer token stratey
passport.use(new BearerStrategy(
  function(accessToken, callback){
    Token.findOne({ value: accessToken }, function(err, token){
      if(err)
        return callback(err);

      if(!token)
        return callback(null, false);

      User.findOne({ _id: token.user_id }, function(err, user){
        if(err)
          return callback(err);

        if(!user)
          return callback(err, false);

        //if success, return user with scope
        return callback(null, user, { scope: '*' });
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', {session: false});
exports.isClientAuthenticated = passport.authenticate('client-basic', {session: false});
exports.isBearerAuthenticated = passport.authenticate('bearer', {session: false});
