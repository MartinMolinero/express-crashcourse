const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  }
}, {
  collection: 'Users'
});

module.exports = Users = mongoose.model('Users', UserSchema);
