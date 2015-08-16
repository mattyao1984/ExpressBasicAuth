'use strict';

var express = require('express');
var UserCtrl = require('./user.controller');
var Auth = require('../auth/auth.controller');
var router = express.Router();

router.get('/users', Auth.isAuthenticated, UserCtrl.getUsers);
router.post('/user', UserCtrl.postAddUser);

module.exports = router;
