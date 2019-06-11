module.exports = (app) => {
  let mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
    useCreateIndex: true,
    useNewUrlParser: true
  })


  require('require-all')(__dirname + "/../models/");
}