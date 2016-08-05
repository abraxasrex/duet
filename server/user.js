var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  instrument: {
    type: String,
    default:'sine'
  },
  id: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
