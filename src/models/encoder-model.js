const mongoose = require('mongoose');

const EncoderSchema = new mongoose.Schema({
  // name: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
}, {
  timestamps: true,
});

const Encoder = mongoose.model('Encoder', EncoderSchema);

module.exports = Encoder;