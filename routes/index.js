const router = require("koa-router")({
  prefix: "/xu",
});
const { Authenticate } = require("../middlewares/authenticate");
const api = require("../api");

// 接口定义
// 用户登录
router.get("/user/login", api.user.index.login);
// 获取用户信息
router.get("/user/getInfo", api.user.index.getInfo);
// 注册新用户
router.post("/user/register", api.user.index.register);
// 用户信息更新
router.post("/user/updateInfo", api.user.index.updateInfo);
// 用户密码修改
router.post("/user/updatePass", api.user.index.updatePass);
// 获取用户每日
router.get("/daily/getDaily", api.daily.index.getDaily);
// 获取所有每日
router.get("/daily/getAllDaily", api.daily.index.getAllDaily);
// 发表每日
router.post("/daily/addDaily", api.daily.index.addDaily);
// 删除每日
router.get("/daily/deletDaily", api.daily.index.deletDaily);
// 获取tag名
router.get("/daily/getTag", api.daily.index.getTag);
// 获取tag下所有daily
router.get("/daily/getTagDaily", api.daily.index.getTagDaily);
// 获取daily对应评论
router.get("/comment/getComment", api.comment.index.getComment);
// 获取daily对应一级评论
router.get("/comment/getFirstComment", api.comment.index.getFirstComment);
// 添加daily对应评论
router.post("/comment/addComment", api.comment.index.addComment);
// router.get("/laster", new Authenticate().auth(第一个中间件), (ctx, next) => {
//   ctx.body = ctx.auth;
// }(第二个中间件))
// 在用到token验证的接口，加入中间件函数，并且调用模块方法verify验证token是否正确
// router.post('/logout', verifyToken, (req, res) => {
//   jwToken.verify(req.token, secret, (err, data) => {
//       if (!err) {
//         //token正确，做些事情
//           res.json({message: '退出登录', data})
//       } else{
//         //token不正确，返回401
//         res.status(401).send()
//       }
//   })
// })

module.exports = router;
