'use strict';

var express = require('express');
var oauth2Ctrl = require('./oauth2.controller');
var Auth = require('../auth/auth.controller');
var router = express.Router();

router.get('/oauth2/authorize', Auth.isAuthenticated, oauth2Ctrl.authorization);
router.post('/oauth2/authorize', Auth.isAuthenticated, oauth2Ctrl.decision);
router.post('/oauth2/token', Auth.isAuthenticated, oauth2Ctrl.token);

module.exports = router;
