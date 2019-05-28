let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  title: { type: String },
  items: [{
    url: { type: String },
    image: { type: String }
  }]
})

module.exports = mongoose.model('Ad', Schema);