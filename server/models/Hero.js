const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }, // 英雄名称
  avatar: { type: String }, // 英雄头像
  title: { type: String }, // 英雄称号
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 分类
  scores: { // 评分
    difficult: { type: Number }, // 
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String },
  }],
})

module.exports = mongoose.model('Hero', schema)