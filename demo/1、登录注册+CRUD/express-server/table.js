function tableRequests(app) {
  // 模拟表格数据
  let mockTableData = [
    {
      id: 1,
      title: "u",
      publish: "uuuu",
      publishTime: "2019-9-25"
    },
    {
      id: 2,
      title: "aa",
      publish: "aaaa",
      publishTime: "2019-9-30"
    },
  ];

  function handleEvent(callback, res) {
    let flag;
    try {
      callback();
      flag = true;
    } catch (error) {
      console.log('error: ', error);
      flag = false;
    } finally {
      res.json({
        flag: flag,
      }) 
    }
  }

  // 查询表格数据
  app.get('/table/query', (req, res) => {
    res.json(mockTableData);
  })

  // 查询单条表格数据
  app.get('/table/query/one/:id', (req, res) => {
    let { id } = req.params;
    let result = mockTableData.find((item) => {
      return item.id == id;
    });
    res.json(result);
  })

  // 添加表格数据
  app.post('/table/add', (req, res) => {
    handleEvent(() => {
      mockTableData.push(req.body);
    }, res);
  })

  // 修改表格数据
  app.put('/table/update', (req, res) => {
    handleEvent(() => {
      let { id } = req.body;

      mockTableData = mockTableData.map((item) => {
        if (item.id == id) {
          item = {...req.body};
        }
        return item;
      })
    }, res);
  })

  // 删除表格数据
  app.delete('/table/del', (req, res) => {
    handleEvent(() => {
      mockTableData = mockTableData.filter((item) => {
        return item.id != req.body.id;
      })
    }, res);
  })
}

module.exports = tableRequests;