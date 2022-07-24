function processLoginRequests(app) {
  // 模拟登录注册所需数据
  let mockData = [
    { username: 'admin', password: '123456' },
    { username: 'cxm', password: '123456' },
  ];

  // 查找用户
  function findUser(reqBody, isRegister = false) {
    let { username, password } = reqBody;
    for (const userInfo of mockData) {
      // 登录时需同时匹配用户名和密码，注册时只需匹配用户名
      if (userInfo.username === username && (isRegister || userInfo.password === password)) {
        return true;
      }
    }
    return false;
  }

  // 登录
  app.post('/user/login', (req, res) => {
    let hasUser = findUser(req.body);
    res.json({
      flag: hasUser,
    });
  })

  // 注册
  app.post('/user/register', (req, res) => {
    let hasUser = findUser(req.body, true);
    if (!hasUser) {
      mockData.push(req.body);
    }
    res.json({
      flag: !hasUser,
    });
  })
}

module.exports = processLoginRequests;