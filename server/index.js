let express = require('express');

let app = express();
let router = express.Router({
  mergeParams: true
});



app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(require('cors')());
app.use(express.json());

require('./plugins/db.js')(app);
require('./routes/admin')(app, router);

app.listen(3000, () => {
  console.log('Serve listening port 3000 !');
})