// 获取基础配置
const configs = require("../config/default");

var knex = require("knex")({
  client: "mysql",
  connection: {
    host: configs.database.HOST,
    port: configs.database.PORT,
    user: configs.database.USERNAME,
    password: configs.database.PASSWORD,
    database: configs.database.DATABASE,
  },
});
// 初始化 SDK
// 将基础配置和 sdk.config 合并传入 SDK 并导出初始化完成的 SDK
module.exports = { mysql: knex };
