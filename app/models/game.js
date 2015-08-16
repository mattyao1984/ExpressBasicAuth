var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  name: String,
  year: String,
  publish_by: String,
  user_id: String
});

module.exports = mongoose.model('Game', GameSchema);
