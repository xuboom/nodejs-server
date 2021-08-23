const Koa = require("koa");
const path = require("path");
const config = require("./config/default.js");
const app = new Koa();
const https = require("https");
const sslify = require("koa-sslify").default;
const bodyParser = require("koa-bodyparser");
const response = require("./middlewares/response");
const fs = require("fs");
const mysql = require("mysql");

// 阿里证书
const options = {
  key: fs.readFileSync("./config/cert/6167442_www.xuyanfei.xyz.key"),
  cert: fs.readFileSync("./config/cert/6167442_www.xuyanfei.xyz.pem"),
};
// 使用响应处理中间件
app.use(response);
// 解析请求体
app.use(bodyParser());
app.use(sslify());
// 引入路由分发
const router = require("./routes");
app.use(router.routes()); // 添加路由中间件

// 启动程序，监听端口
// app.listen(config.port, () => {
//   console.log("server is listening at https://localhost:3700");
// });

https.createServer(options, app.callback()).listen(config.port, () => {
  console.log("server is listening at https://localhost:3700");
});
