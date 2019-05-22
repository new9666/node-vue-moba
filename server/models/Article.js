const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 分类
})

module.exports = mongoose.model('Article', schema)