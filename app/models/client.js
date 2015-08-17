var mongoose = require('mongoose');

//TODO: Hash the secret at least
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  id: { type: String, required: true },
  secret: { type: String, required: true },
  user_id: { type: String, required: true }
});

module.exports = mongoose.model('Client', ClientSchema);
