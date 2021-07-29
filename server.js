const Koa = require("koa");
const path = require("path");
const config = require("./config/default.js");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const response = require("./middlewares/response");

const mysql = require("mysql");

// 使用响应处理中间件
app.use(response);
// 解析请求体
app.use(bodyParser());
// 引入路由分发
const router = require("./routes");
app.use(router.routes()); // 添加路由中间件
// 启动程序，监听端口
app.listen(config.port, () => {
  console.log("server is listening at http://localhost:3700");
});
