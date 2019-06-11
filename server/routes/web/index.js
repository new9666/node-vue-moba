module.exports = (app, router) => {
  let mongoose = require("mongoose");
  let Article = mongoose.model("Article");
  let Category = mongoose.model("Category");

  router.get("/news/init", async (req, res) => {

    let parent = await Category.findOne({
      name: "新闻分类"
    })


    let cats = await Category.find().where({
      parent: parent
    }).lean();

    let newsTitles = ["夏日新版本“稷下星之队”即将6月上线", "王者荣耀携手两大博物馆 走进稷下学宫", "王者大陆第一学院【稷下】档案", "云端梦境 | 全新福利系统！助你美梦成真~", "跨界合作丨控油神装登场，唤醒无限护肤力量！", "6月11日全服不停机更新公告", "6月7日体验服停机更新公告", "关于2019年KPL春季赛总决赛 RNG.M vs eStarPro 补赛、赛果及世界冠军杯安排公告", "【已修复】王者大陆的端午宝藏活动页面异常问题说明", "净化游戏环境声明及处罚公告（6月3日-6月9日）", "活力夏日活动周 王者峡谷好礼多", "王者大陆的端午宝藏活动公告", "峡谷庆端午 惊喜礼不断", "【场里场外，一起开黑】感恩礼包放送", "KPL总决赛来临之际 场里场外一起开黑/观赛活动开启！", "【6月15日 再战西安 · 2019年KPL春季赛总决赛重启公告】", "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？", "【关于2019年KPL春季赛总决赛门票退换及异地用户现场观赛补贴公告】", "【微赛事·王者城市公会赛】闲云专场首周火热开赛，天才在左专场即将接力开赛", "世界冠军杯正赛赛制公布，目标：世界冠军！"];

    let newsList = newsTitles.map(title => {
      let randomCats = cats.slice(0).sort((a, b) => {
        return Math.random() - 0.5
      })
      return {
        title,
        categories: randomCats.slice(0, 2)
      }
    })

    await Article.deleteMany({});
    await Article.insertMany(newsList);
    res.send(newsList);
  })

  app.use('/web/api', router);
}