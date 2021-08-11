const { mysql } = require("../../lib/mysql");

const jwt = require("jsonwebtoken");

async function getDaily(ctx) {
  const { userid } = ctx.query;
  let daily;
  daily = await mysql("daily")
    .where({
      user_id: userid,
    })
    .orderBy("id", "desc")
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
async function getAllDaily(ctx) {
  const dailylist = await mysql("daily")
    .column(
      "daily.id",
      "daily.user_id",
      "user.name",
      "user.image",
      "daily.mood",
      "daily.weather",
      "daily.time",
      "daily.description",
      "tag_name.tag_id",
      "tag_name.tag_name"
    )
    .leftJoin("tag_name", "daily.tag", "tag_name.tag_id")
    .leftJoin("user", "daily.user_id", "user.id")
    .orderBy("daily.id", "desc")
    .select();
  for (let i = 0; i < dailylist.length; i++) {
    let dailyid = dailylist[i].id;
    let num = await mysql("comment")
      .where({
        daily_id: dailyid,
      })
      .count("comment_id as sum");
    let sum = JSON.stringify(num);
    let res = JSON.parse(sum);
    if (res !== 0) {
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
          .select();
        name = JSON.stringify(name);
        name = JSON.parse(name);
        let subnum = await mysql("comment")
          .where({
            sub_id: comments[j].comment_id,
          })
          .count("comment_id as subnum");

        let subsum = JSON.stringify(subnum);
        let subres = JSON.parse(subsum);
        comments[j].subsum = subres[0].subnum;
        comments[j].user_name = name[0].name;
      }
      dailylist[i].first_comments = comments;
    }
    dailylist[i].sum = res[0].sum;
  }
  if (dailylist.length > 0) {
    ctx.body = {
      code: 0,
      msg: "success",
      data: dailylist,
    };
  } else {
    ctx.body = {
      code: 999,
      msg: "fail",
      data: [],
    };
  }
}
async function addDaily(ctx) {
  const { userid, mood, weather, time, description, tag } = ctx.request.body;
  const data = await mysql("daily").insert({
    user_id: userid,
    mood: mood,
    weather: weather,
    time: time,
    description: description,
    tag: tag,
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
async function deletDaily(ctx) {
  const id = ctx.query.id;
  const data = await mysql("daily")
    .where({
      id: id,
    })
    .del();
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
async function getTag(ctx) {
  const taglist = await mysql("tag_name").select();
  if (taglist.length > 0) {
    ctx.body = {
      code: 0,
      msg: "success",
      data: taglist,
    };
  } else {
    ctx.body = {
      code: 999,
      msg: "fail",
      data: [],
    };
  }
}
async function getTagDaily(ctx) {
  const { tagid } = ctx.query;

  const tagdailylist = await mysql("daily")
    .where({
      tag: tagid,
    })
    .column(
      "daily.id",
      "daily.user_id",
      "user.name",
      "user.image",
      "daily.mood",
      "daily.weather",
      "daily.time",
      "daily.description"
    )
    .leftJoin("user", "daily.user_id", "user.id")
    .orderBy("daily.id", "desc")
    .select();
  if (tagdailylist.length >= 0) {
    ctx.body = {
      code: 0,
      msg: "success",
      data: tagdailylist,
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
  getAllDaily,
  addDaily,
  deletDaily,
  getTag,
  getTagDaily,
};
