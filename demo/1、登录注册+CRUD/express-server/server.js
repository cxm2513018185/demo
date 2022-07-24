let express = require("express");
let bodyParser = require("body-parser");
let processLoginRequests = require('./login-register');
let proccessTableRequests = require('./table');

let app = express();

// 跨域
let allowCrossDomain = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 设置请求源
  res.setHeader('Access-Control-Allow-Headers', '*'); // 设置请求头
  res.setHeader('Access-Control-Allow-Methods', '*'); // 设置请求方式
  next();
}

// 允许跨域
app.use(allowCrossDomain);

// 解析请求体
app.use(bodyParser.json()); // json数据
app.use(bodyParser.urlencoded({ // 表单数据
  extended: true
}));

// 处理登录请求
processLoginRequests(app);
// 处理表格的相关请求
proccessTableRequests(app);

// 监听端口
app.listen(3000, () => {
  console.log('服务已启动，端口3000');
});