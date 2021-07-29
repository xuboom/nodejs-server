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
  let isRegister = [];
  isRegister = await mysql("user")
    .where({
      name: username,
      password: password,
    })
    .select();
  if (isRegister.length > 0) {
    ctx.body = {
      data: isRegister,
    };
  } else {
    ctx.body = {
      data: false,
    };
  }
}

async function register(ctx) {}

module.exports = {
  login,
  register,
};
