const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const FavoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Videos',
    required: true,
  }
}, {
  collection: 'Favorites'
});

module.exports = Favorites = mongoose.model('Favorites', FavoriteSchema);
