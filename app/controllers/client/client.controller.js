'use strict';

var Client = require('../../models/client');

exports.postClients = function(req, res){
  var client = new Client();

  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.user_id = req.user._id;

  client.save(function(err){
    if(err)
      res.send(err);

    res.json({
      message: 'Client added to the collection!',
      data: client
    });
  });
};

exports.getClients = function(req, res){
  Client.find({ user_id: req.user._id }, function(err, clients){
    if(err)
      res.send(err);

    res.json(clients);
  });
};
