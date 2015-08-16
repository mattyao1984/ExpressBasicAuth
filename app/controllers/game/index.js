'use strict';

var express = require('express');
var GameCtrl = require('./game.controller');
var Auth = require('../auth/auth.controller');
var router = express.Router();

router.get('/game', Auth.isAuthenticated, GameCtrl.getAllGames);
router.post('/game', Auth.isAuthenticated, GameCtrl.postAddGame);
router.get('/game/:game_id', Auth.isAuthenticated, GameCtrl.getGame);
router.put('/game/:game_id', Auth.isAuthenticated, GameCtrl.updateGame);
router.delete('/game/:game_id', Auth.isAuthenticated, GameCtrl.deleteGame);

module.exports = router;
