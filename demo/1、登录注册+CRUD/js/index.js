// 字面量对象
const table = {
  init() {
    this.bind();
    this.query();
  },
  bind() {
    let addBtn = $('#addBtn');
    let mtable = $('#mtable');

    addBtn.click(() => {
      let id = new Date().getTime();
      let title = $('#title').val();
      let publish = $('#publish').val();
      let publishTime = $('#publishTime').val();
      if (!title || !publish || !publishTime) {
        alert('请完善表单内容！');
        return;
      }
      let data = {
        id,
        title,
        publish,
        publishTime
      }
      this.add(data);
    })

    // 事件委托
    mtable.click((e) => {
      let eventType = $(e.target).attr('class');
      let oid = $(e.target).attr('oid');

      switch (eventType) {
        case 'delete':
          let result = confirm('是否确认删除？');
          if (result === true) {
            this.del(oid);
          }
          break;
        case 'update':
          this.queryOne(oid);
          break;
      
        default:
          break;
      } 
    })

    $('.close, .closeBtn').click(() => {
      this.closeMask();
    })

    $('.updateBtn').click(() => {
      let id = $('#edit-id').val();
      let title = $('#edit-title').val();
      let publish = $('#edit-publish').val();
      let publishTime = $('#edit-publishTime').val();
      let obj = {
        id,
        title,
        publish,
        publishTime,
      }
      this.update(obj);
    })
  },
  // 添加
  add(data) {
    $http.request({
      type: 'POST',
      url: '/table/add',
      data: {
        ...data,
      },
      success: (res) => {
        let { flag } = res;
        if (flag) {
          $('#table input').val('');
          this.query();
          alert('新增成功');
        }
      }
    })
  },
  // 删除
  del(id) {
    $http.request({
      type: 'DELETE',
      url: '/table/del',
      data: {
        id,
      },
      success: (res) => {
        alert('删除成功');
        this.query();
      }
    })
  },
  // 查询单条数据
  queryOne(id) {
    $http.request({
      type: 'GET',
      url: `/table/query/one/${id}`,
      success: (res) => {
        this.openMask(res);
      }
    })
  },
  // 更新
  update(obj) {
    $http.request({
      type: 'PUT',
      url: `/table/update`,
      data: {
        ...obj,
      },
      success: () => {
        alert('数据更新成功');
        this.closeMask();
        this.query();
      }
    })
  },
  addZero(number) {
    return number < 10 ? '0' + number : number;
  },
  openMask(form) {
    let publishDateTime = new Date(form.publishTime);
    let publishYear = publishDateTime.getFullYear();
    let publishMonth = this.addZero(publishDateTime.getMonth() + 1);
    let publishDate = this.addZero(publishDateTime.getDate());
    let realPublishTime = `${publishYear}-${publishMonth}-${publishDate}`

    $('#edit-id').val(form.id);
    $('#edit-title').val(form.title);
    $('#edit-publish').val(form.publish);
    $('#edit-publishTime').val(realPublishTime);

    $('#mask').show();
  },
  closeMask() {
    $('#mask').hide();
  },
  // 查询
  query() {
    $http.request({
      type: 'GET',
      url: '/table/query',
      success: (res) => {
        this.renderHTML(res);
      }
    })
  },
  renderHTML(data) {
    let str = '';
    data.forEach((item) => {
      str += `
        <tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.publish}</td>
            <td>${item.publishTime}</td>
            <td>
                <span oid="${item.id}" class="delete">删除</span>
                <span oid="${item.id}" class="update">修改</span>
            </td>
        </tr>`;
    });
    let mtable = $('#mtable');
    mtable.html(str);
  }
}

$(document).ready(function() {
  table.init();
})