const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  files: [{
    filename: { type: String, required: true },
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
  }]
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
