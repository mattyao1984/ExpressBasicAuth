var mongoose = require('mongoose');

//TODO: Hashing the authorization code
var CodeSchema = new mongoose.Schema({
  value: { type: String, required: true},
  redirectUri: { type: String, required: true},
  user_id: { type: String, required: true},
  client_id: { type: String, required: true},
});

module.exports = mongoose.model('Code', CodeSchema);
