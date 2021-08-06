const { mysql } = require("../../lib/mysql");

const jwt = require("jsonwebtoken");

async function getComment(ctx) {
  const { dailyid } = ctx.query;

  let res = await mysql("comment")
    .where({
      daily_id: dailyid,
    })
    .orderBy("parent_id");

  res.forEach((element) => {
    let parent_id = element.parent_id;
    if (parent_id !== 0) {
      res.forEach((ele) => {
        if (ele.comment_id == parent_id) {
          //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
          if (!ele.children) {
            ele.children = [];
          }
          ele.children.push(element);
        }
      });
    }
  });
  res = res.filter((ele) => ele.parent_id === 0);
  ctx.body = {
    code: 0,
    msg: "success",
    data: res,
  };
}

async function getCommentSum(ctx) {
  let sum;

  ctx.body = {
    code: 0,
    msg: "success",
    data: sum,
  };
}
module.exports = {
  getComment,
  getCommentSum,
};
