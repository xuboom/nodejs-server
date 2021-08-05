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
