const baseAuth = require("basic-auth");
const jwt = require("jsonwebtoken");

class Authenticate {
  constructor() {}

  // auth是属性，不是方法，返回值是一个方法(中间件)
  get auth() {
    // 返回token认证中间件(中间件是一个函数，而不能是对象)
    return async (ctx, next) => {
      // 注意baseAuth的参数是ctx.req，而不是ctx.request，ctx.req是node.js原生的request对象，而ctx.request是koa对原生request封装后的对象
      const userToken = baseAuth(ctx.req);
      if (!userToken || !userToken.name) {
        // 抛出自定义的异常
        throw new global.errors.Forbidden("token令牌不能为空");
      }
      let decode;
      try {
        // 跟生成token时的密钥要保持一直，可以放在配置文件中
        const secretKey = "abcdefg";
        // 对token进行解密操作，获取保存到token中的用户信息
        decode = jwt.verify(userToken.name, secretKey);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          throw new global.errors.Forbidden("token令牌已过期");
        }
        throw new global.errors.Forbidden("token令牌无效");
      }
      // 将用户信息保存到ctx中，可以在其他的中间件中获取到
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };
      // 前面必须要加上await，才能保证洋葱模型，如果不调用next()，就不会执行下一个中间件
      await next();
    };
  }
}

module.exports = {
  Authenticate,
};
