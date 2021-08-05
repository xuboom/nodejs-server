# nodejs-server

&emsp;

# 功能设计

&emsp;

## 用户管理模块

### 用户登录

##### API_LOGIN: '/user/login'

- 1.get
- 2.name+password 匹配
- 3.成功返回用户信息
- 4.失败返回 code：0 data：{} msg

### 用户注册

- 1.post
- 2.name 查询是否被注册
- 3.插入
- 4.成功返回用户信息
- 5.失败返回 code：0 data：{} msg

### 用户退出

- 1.post
- 2.返回 msg
- 3.token？

### 修改信息

#### 密码

- 旧密码验证

#### 其他

- token？

###

## 日常内容模块

### 获取日常内容

##### API_LOGIN: '/user/login'

- 1.get
- 2.mood 定义：0-大笑 1-笑 2-一般 3-伤心 4-哭泣 5-生气
- 3.weather 定义：0-晴天 1-多云 2-阴天 3-下雨 4-雷电 5-下雪
