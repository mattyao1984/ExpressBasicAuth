var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config');
var Auth = require('./app/controllers/auth/auth.controller');

var app = express();
var port = process.env.port || 3002;

//Connect to DB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

//Init passport
app.use(passport.initialize());

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes')(app);

app.listen(port);
