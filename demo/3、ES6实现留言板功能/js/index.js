let Message = {
  map: new Map(),
  init() {
    this.bind();
  },
  bind() {
    $('.submit').click(() => {
      let name = $('.name').val();
      let message = $('.message').val();
      if (!name || !message) {
        alert('请完善信息之后再提交！');
        return;
      }
      this.submit(name, message);
      this.reset();
    })

    // 事件委托
    $('.messageList').click((e) => {
      let className = $(e.target).attr('class');
      if (className.includes('deleteBtn')) {
        let oid = $(e.target).attr('oid');
        this.map.delete(oid);
        this.showMessageList();
      }
    })
  },
  reset() {
    $('.name, .message').val('');
  },
  showMessageList() {
    let str = '';
    for (let [key, val] of this.map) {
      str += `<li class="list-group-item">${val[0]}
          <span>说：</span>${val[1]}
          <button class="btn btn-danger pull-right deleteBtn" oid="${key}">删除</button>
      </li>`
    }
    $('.messageList').html(str);
  },
  submit(name, message) {
    this.map.set(String(new Date().getTime()), [name, message]);
    this.showMessageList();
  }
}

$(document).ready(function() {
  Message.init();
})