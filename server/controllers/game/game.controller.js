'use strict';

var Game = require('../../models/game');
var Auth = require('../auth/auth.controller');

exports.postAddGame = function(req, res){
  var game = new Game();

  game.name = req.body.name;
  game.year = req.body.year;
  game.publish_by = req.body.publish_by;
  game.user_id = req.user._id;

  game.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Game added to the collection!', data: game });
  });
};

exports.getAllGames = function(req, res){
  Game.find({ user_id: req.user._id }, function(err, games) {
    if (err)
      res.send(err);

    res.json(games);
  });
};

exports.getGame = function(req, res){
  Game.findById({ _id: req.params.game_id, user_id: req.user._id }, function(err, game) {
    if (err)
      res.send(err);

    res.json(game);
  });
};

exports.updateGame = function(req, res){
  Game.update({ user_id: req.user._id, _id: req.params.game_id }, {
    name: req.body.name,
    year: req.body.year,
    publish_by: req.body.publish_by
  }, function(err, data, raw) {
    if (err)
      res.send(err);

    res.json({ message: data + ' updated' });
  });
};

exports.deleteGame = function(req, res){
  Game.remove({ _id: req.params.game_id, user_id: req.user._id },  function(err, game) {
    if (err)
      res.send(err);

    res.json({
      'status': 'success'
    });
  });
};
