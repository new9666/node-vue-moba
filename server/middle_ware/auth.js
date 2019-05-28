module.exports = options => {
  let jwt = require('jsonwebtoken');
  let AdminUser = require("../models/AdminUser");
  let assert = require("http-assert");

  return async (req, res, next) => {
    let token = String(req.headers.authorization || '').split(' ').pop();

    assert(token, 401, "请提供 jwt token ");
    let { _id } = await jwt.verify(token, req.app.get('secret'));

    assert(_id, 401, "请提供正确的 token");
    req.user = await AdminUser.findOne({ _id })

    assert(req.user, 401, "请先登录");

    await next();
  }

}