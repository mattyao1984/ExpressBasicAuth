var moongose = require('mongoose');

var TokenSchema = new moongose.Schema({
  value: { type: String, required: true },
  user_id: { type: String, required: true },
  client_id: { type: String, required: true },
});

module.exports = moongose.model('Token', TokenSchema);
