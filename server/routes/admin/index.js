module.exports = (app, router) => {

  let jwt = require('jsonwebtoken');
  let AdminUser = require('../../models/AdminUser');
  let assert = require('http-assert');

  // 登录校验中间件
  const authMiddleWare = require('../../middle_ware/auth');

  const resourceMiddleware = require('../../middle_ware/resource');


  // 创建资源
  router.post('/', async (req, res) => {
    let model = await req.Model.create(req.body);
    // console.log("+++++++++++++", req.body);
    res.send(model);
  })




  // 获取资源
  router.get('/', async (req, res) => {

    let queryOptions = {};

    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    } else if (req.Model.modelName === 'Article') {
      queryOptions.populate = '';// 'categories'
    }
    let items = await req.Model.find().setOptions(queryOptions);
    // populate('parent')

    res.send(items);
  })

  // 通过 ID 获取资源详情
  router.get('/:id', async (req, res) => {
    let model = await req.Model.findById(req.params.id);
    res.send(model);
  })

  // 修改已有的分类
  router.put('/:id', async (req, res) => {
    let model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  })


  // 删除资源
  router.delete('/:id', async (req, res) => {
    let model = await req.Model.findByIdAndRemove(req.params.id);
    res.send({ errno: 0, msg: 'Success' });
  })

  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleware(), router);


  let multer = require('multer');
  let upload = multer({
    dest: __dirname + '/../../uploads'
  })


  // 为什么上传图片的请求没有带 authorization
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    let file = req.file;
    file.url = 'http://localhost:3000/uploads/' + file.filename;
    res.send(file);
  })


  // 登录接口
  app.post('/admin/api/login', async (req, res) => {

    let { username, password } = req.body;

    //1 通过用户名找用户
    let user = await AdminUser.findOne({
      username: username
    }).select('+password');

    if (!user) {
      // 如果该用户不存在
      return res.status(422).send({
        "msg": "用户不存在"
      })
    }

    //2 校验密码
    let bcrypt = require('bcrypt');
    let isValid = bcrypt.compareSync(password, user.password);
    // console.log("密码是否正确?___", passwd)

    if (!isValid) {
      // 密码错误
      return res.status(422).send({
        msg: "密码错误"
      })
    }


    //3 返回 Token

    // jwt.sign( arg1, arg2 ); 
    //           arg1:第一个参数：要加密的数据，可以是任何数据
    //           arg2:第二个参数：加密时添加的秘钥，后期需要用到这个秘钥来解密出第一个参数传的数据

    let token = jwt.sign({ _id: user._id }, app.get('secret'));

    res.send({ token });

  })


  // 错误处理函数

  app.use(async (err, req, res, next) => {

    res.status(err.statusCode || 500).send({
      msg: err.message
    });

  })

}