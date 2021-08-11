const { mysql } = require("../../lib/mysql");

const jwt = require("jsonwebtoken");
const { result } = require("lodash");

async function getComment(ctx) {
  const { dailyid } = ctx.query;

  let res = await mysql("comment")
    .where({
      daily_id: dailyid,
    })
    .orderBy("comment_id", "desc");
  // 获取回复的用户信息
  for (let i = 0; i < res.length; i++) {
    let parent_id = res[i].parent_id;
    let user_id = res[i].user_id;
    let userinfo = await mysql("user")
      .column("user.image", "user.name")
      .where({ id: user_id });

    userinfo = JSON.stringify(userinfo);
    userinfo = JSON.parse(userinfo);
    res[i].userinfo = userinfo[0];

    if (parent_id !== 0) {
      // 获取回复的对象名
      let comment_id = res[i].parent_id;
      let usr = await mysql("comment").column("user_id").where({
        comment_id: comment_id,
      });
      let author_name = await mysql("user")
        .column("user.name")
        .where({ id: usr[0].user_id });
      author_name = JSON.stringify(author_name);
      author_name = JSON.parse(author_name);
      res[i].author_name = author_name[0].name;
      // 转树结构
      res.forEach((ele) => {
        if (ele.comment_id == parent_id) {
          //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
          if (!ele.children) {
            ele.children = [];
          }
          ele.children.push(res[i]);
        }
      });
    }
  }
  res = res.filter((ele) => ele.parent_id === 0);
  ctx.body = {
    code: 0,
    msg: "success",
    data: res,
  };
}
async function getFirstComment(ctx) {
  const { dailyid } = ctx.query;
  let comments = await mysql("comment")
    .where({
      daily_id: dailyid,
      parent_id: 0,
    })
    .orderBy("comment.comment_id", "desc")
    .select();
  comments = JSON.stringify(comments);
  comments = JSON.parse(comments);
  for (let j = 0; j < comments.length; j++) {
    let name = await mysql("user")
      .where({
        id: comments[j].user_id,
      })
      .column("user.name")
      .select();
    name = JSON.stringify(name);
    name = JSON.parse(name);
    let subnum = await mysql("comment")
      .where({
        parent_id: comments[j].comment_id,
      })
      .count("comment_id as subnum");

    let subsum = JSON.stringify(subnum);
    let subres = JSON.parse(subsum);
    comments[j].subsum = subres[0].subnum;
    comments[j].user_name = name[0].name;
  }
  ctx.body = {
    code: 0,
    msg: "success",
    data: comments,
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
async function addComment(ctx) {
  const { daily_id, user_id, time, content, parent_id, sub_id } =
    ctx.request.body;
  const data = await mysql("comment").insert({
    user_id: user_id,
    daily_id: daily_id,
    content: content,
    time: time,
    parent_id: parent_id,
    sub_id: sub_id,
  });
  if (data) {
    ctx.body = {
      code: 0,
      msg: "success",
    };
  } else {
    ctx.body = {
      code: 999,
      msg: "fail",
    };
  }
}
module.exports = {
  getComment,
  getCommentSum,
  getFirstComment,
  addComment,
};
