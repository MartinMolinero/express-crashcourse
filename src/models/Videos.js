const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const VideoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  youtubeLink: {
    type: String,
    required: true
  },
}, {
  collection: 'Videos'
});

module.exports = Videos = mongoose.model('Videos', VideoSchema);
