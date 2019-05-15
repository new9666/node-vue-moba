let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  name: { type: String }
})

module.exports = mongoose.model('Category', Schema);