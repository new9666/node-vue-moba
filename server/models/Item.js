let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
})

module.exports = mongoose.model('Item', Schema);