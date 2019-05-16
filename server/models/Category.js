let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" }
})

module.exports = mongoose.model('Category', Schema);