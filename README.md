# nodejs-server 留言小程序后台

基于 koa2+nodejs+mysql 的留言小程序后台

# 功能设计

## 用户管理模块

### 用户登录

##### API_LOGIN: '/user/login'

- 1.get
- 2.name+password 匹配
- 3.成功返回用户信息
- 4.失败返回 code：0 data：{} msg

### 获取用户信息

##### API_GETINFO: '/user/getInfo'

- 1.get
- 2.params: userid

### 用户注册

##### API_REGISTER: '/user/register'

- 1.post
- 2.name 查询是否被注册
- 3.{
  "name": "name",
  "birthday": "1029-2-9",
  "sex": 1,
  "age": 1,
  "address": "address",
  "email": "111@q.com",
  "password": "111",
  "introduction": "introduction",
  "phone": 13495873920,
  "register_date": "2020-03-12",
  "image": ""
  }

### 修改信息

#### &emsp;&emsp;密码

- 旧密码验证

#### &emsp;&emsp;其他

##### API_UPDATEINFO: '/user/updateInfo'

- 1.post
- 2.{
  "userid":2,
  "name": "name",
  "birthday": "1029-2-9",
  "sex": 1,
  "age": 1,
  "address": "address",
  "email": "111@q.com",
  "introduction": "introduction",
  "phone": 13495873920,
  "image": ""
  }s

&emsp;

## 日常内容模块

### 获取全部日常内容

##### API_GETALLDAILY: '/daily/getAllDaily'

- 1.get
- 2.mood 定义：0-大笑 1-笑 2-一般 3-伤心 4-哭泣 5-生气
- 3.weather 定义：0-晴天 1-多云 2-阴天 3-下雨 4-雷电 5-下雪

### 获取 tag 下日常内容

##### API_GETTAGDAILY: '/daily/getTagDaily'

- 1.get
- 2.param：tagid

### 获取用户对应日常内容

##### API_GETDAILY: '/daily/getDaily'

- 1.get
- 2.params: userid

### 获取 tag 标签名

##### API_GETTAG: '/daily/getTag'

- 1.get

### 添加日常内容

##### API_ADDDAILY: '/daily/addDaily'

- 1.post
- 2.{
  "description": "tedfagst",
  "userid": 1,
  "mood": 0,
  "weather": 1,
  "time": "2013-2-13",
  "tag": 1 //可选
  }

### 删除个人日常内容

##### API_DELETEDAILY: '/daily/deletDaily'

- 1.get
- 2.params: id

## 评论点赞功能模块

### 获取对应 daily 的评论

##### API_GETCOMMENT: '/comment/getComment'

- 1.get
- 2.params: dailyid

### 获取 daily 一级评论

##### API_GETFIRSTCOMMENT: '/comment/getFirstComment'

- 1.get
- 2.params: dailyid

### 添加评论

##### API_ADDCOMMENT: '/comment/addComment'

- 1.post
- 2.{
  "daily_id": 65,
  "user_id": 4,
  "parent_id": 0,
  "sub_id": 0,
  "content": "对啊",
  "time": "2021-08-10 14:23"
  }
