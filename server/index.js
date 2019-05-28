let express = require('express');

let app = express();
let router = express.Router({
  mergeParams: true
});


// 设置一个全局的 Secret，让 jwt 用来生成签名
app.set('secret', "asdfghjkl");


app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(require('cors')());
app.use(express.json());

require('./plugins/db.js')(app);
require('./routes/admin')(app, router);

app.listen(3000, () => {
  console.log('Serve listening port 3000 !');
})