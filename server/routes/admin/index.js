module.exports = (app, router) => {


  let Category = require('../../models/Category');



  // 创建一个新的分类
  router.post('/categories', async (req, res) => {
    let model = await Category.create(req.body);

    console.log(req.body);
    res.send(model);
  })


  // 获取分类列表
  router.get('/categories', async (req, res) => {
    let items = await Category.find();
    res.send(items);
  })

  // 通过 ID 获取分类详情
  router.get('/categories/:id', async (req, res) => {
    let model = await Category.findById(req.params.id);
    res.send(model);
  })

  // 修改已有的分类
  router.put('/categories/:id', async (req, res) => {
    let model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  })


  // 删除分类
  router.delete('/categories/:id', async (req, res) => {
    let model = await Category.findByIdAndRemove(req.params.id);
    res.send({ errno: 0, msg: '删除分类成功！' });
  })

  app.use('/admin/api', router);


}