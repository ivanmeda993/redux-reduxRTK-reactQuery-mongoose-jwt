const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Marker', markerSchema);
