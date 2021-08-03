const { mysql } = require("../../lib/mysql");

const jwt = require("jsonwebtoken");

async function getDaily(ctx) {
  const { userid } = ctx.query;
  let daily;
  daily = await mysql("daily")
    .where({
      user_id: userid,
    })
    .select();
  if (daily.length > 0) {
    ctx.body = {
      code: 0,
      msg: "success",
      data: daily,
    };
  } else {
    ctx.body = {
      code: 999,
      msg: "fail",
      data: [],
    };
  }
}
module.exports = {
  getDaily,
};
