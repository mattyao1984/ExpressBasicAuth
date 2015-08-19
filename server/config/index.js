'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../..'),
  // Server port
  port: process.env.PORT || 3002,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'none-secrect'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/game-loader',
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
  },

  twitter: {
  },

  google: {
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = all;
