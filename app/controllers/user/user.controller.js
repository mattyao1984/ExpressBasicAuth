'use strict';

var User = require('../../models/user');

exports.postAddUser = function(req, res){
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err){
    if(err)
      res.json({
        'status': 'error',
        'error': err
      });

    res.json({
      'status': 'success',
      'user_id': user.id
    });
  });
};

exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};
