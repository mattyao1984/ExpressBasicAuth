var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();
var port = process.env.port || 3002;

//Connect to DB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

require('./routes')(app);
require('./config/express')(app);

app.listen(port);
