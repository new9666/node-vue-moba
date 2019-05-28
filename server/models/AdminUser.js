let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let Schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // 查询不到密码
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', Schema);