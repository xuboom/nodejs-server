const router = require("koa-router")({
  prefix: "/xu",
});
const { Authenticate } = require("../middlewares/authenticate");
const api = require("../api");

// 接口定义
router.get("/user/login", api.user.index.login);
router.get("/user/getInfo", api.user.index.getInfo);
router.get("/daily/getDaily", api.daily.index.getDaily);
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
