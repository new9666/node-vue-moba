module.exports = (app, router) => {




  // 创建一个新的分类
  router.post('/', async (req, res) => {
    let model = await req.Model.create(req.body);
    // console.log("+++++++++++++", req.body);
    res.send(model);
  })


  // 获取分类列表
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

  // 通过 ID 获取分类详情
  router.get('/:id', async (req, res) => {
    let model = await req.Model.findById(req.params.id);
    res.send(model);
  })

  // 修改已有的分类
  router.put('/:id', async (req, res) => {
    let model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  })


  // 删除分类
  router.delete('/:id', async (req, res) => {
    let model = await req.Model.findByIdAndRemove(req.params.id);
    res.send({ errno: 0, msg: 'Success' });
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {

    let modelName = require('inflection').classify(req.params.resource);
    req.Model = require('../../models/' + modelName);
    // console.log("++++++++ ModelName", modelName);

    next();
  }, router);



  let multer = require('multer');
  let upload = multer({
    dest: __dirname + '/../../uploads'
  })

  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    let file = req.file;
    file.url = 'http://localhost:3000/uploads/' + file.filename;
    res.send(file);
  })


}