'use strict';

var express = require('express');
var ClientCtrl = require('./client.controller');
var Auth = require('../auth/auth.controller');
var router = express.Router();

router.get('/clients', Auth.isAuthenticated, ClientCtrl.getClients);
router.post('/clients', Auth.isAuthenticated, ClientCtrl.postClients);

module.exports = router;
