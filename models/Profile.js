const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
  firstName: {type: String, trim: true, default: ''},
  lasttName: {type: String, trim: true, default: ''},
  age: {type: Number, trim: true, default: 0},
  team: {type: String, trim: true, default: ''},
  position: {type: String, trim: true, default: ''},
});

module.exports = mongoose.model('Profile', Profile)