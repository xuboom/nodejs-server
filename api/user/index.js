const { mysql } = require("../../lib/mysql");

const jwt = require("jsonwebtoken");

const generateToken = function (uid, scope) {
  const secretKey = "abcdefg"; // 生成token时的密钥，不能泄露
  const expiresIn = 60 * 60; // 生成的token的有效期
  // 生成token
  // 第一个参数是我们要存储到token中的用户信息数据,uid是用户id,scope是用户权限；
  // 第二个参数是加密的密钥；
  // 第三个参数是附带的属性信息，expiresIn是生成的token的有效期
  const token = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    {
      expiresIn,
    }
  );
  return token;
};

async function login(ctx) {
  const { username, password } = ctx.query;
  let isRegister;
  isRegister = await mysql("user")
    .where({
      name: username,
      password: password,
    })
    .select();
  if (isRegister.length > 0) {
    let user = {
      id: isRegister[0].id,
    };
    ctx.body = {
      code: 0,
      msg: "success",
      data: user,
    };
  } else {
    ctx.body = {
      code: 999,
      msg: "fail",
      data: [],
    };
  }
}

async function register(ctx) {
  const {
    name,
    birthday,
    sex,
    age,
    address,
    email,
    password,
    introduction,
    phone,
    register_date,
    image,
  } = ctx.request.body;
  const isExit = await mysql("user").where({
    name: name,
  });
  if (isExit) {
    ctx.body = {
      code: 100,
      msg: "isExit",
    };
    return;
  }
  const data = await mysql("user").insert({
    name: name,
    birthday: birthday,
    sex: sex,
    age: age,
    address: address,
    email: email,
    password: password,
    introduction: introduction,
    phone: phone,
    register_date: register_date,
    image: image,
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

async function getInfo(ctx) {
  const { userid } = ctx.query;
  let isRegister;
  isRegister = await mysql("user")
    .where({
      id: userid,
    })
    .select();
  if (isRegister.length > 0) {
    delete isRegister[0].password;
    ctx.body = {
      code: 0,
      msg: "success",
      data: isRegister[0],
    };
  } else {
    ctx.body = {
      code: 999,
      msg: "fail",
      data: [],
    };
  }
}

async function updateInfo(ctx) {
  const {
    userid,
    name,
    birthday,
    sex,
    age,
    address,
    email,
    introduction,
    phone,
  } = ctx.request.body;
  let result = await mysql("user")
    .where({
      id: userid,
    })
    .update({
      name: name,
      birthday: birthday,
      sex: sex,
      age: age,
      address: address,
      email: email,
      introduction: introduction,
      phone: phone,
    });
  if (result) {
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

async function updatePass(ctx) {
  const { userid, password, newpassword } = ctx.request.body;
  let result = await mysql("user").where({
    id: userid,
    password: password,
  });
  console.log("rere", result);
  if (result !== []) {
    let update = await mysql("user")
      .where({
        id: userid,
      })
      .update({
        password: newpassword,
      });
    if (update) {
      ctx.body = {
        code: 0,
        msg: "success",
      };
    }
  } else {
    ctx.body = {
      code: 100,
      msg: "password wrong",
    };
    return;
  }
}

module.exports = {
  login,
  register,
  getInfo,
  updateInfo,
  updatePass,
};
