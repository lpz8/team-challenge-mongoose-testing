const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
  },
  body: {
    type: String,
    required: [true, 'El cuerpo es obligatorio'],
    trim: true,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);