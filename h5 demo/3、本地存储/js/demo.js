$(function () {
    //提交
    $(".btn-box .submit").click(function () {
        var _name = $(".name").val(),
            _msg = $(".message").val();
        if (!_name || !_msg) {
            alert('请输入信息')
        } else {
            localStorage.setItem(_name, _msg);
            $(".name, .message").val('');  //清空数据
            listShow();
        }

    });
    //查看
    $(".btn-box  .viewMes").click(function () {
        listShow();
    })
    //列表展示
    function listShow() {
        var str = '';
        for (var i = 0; i < localStorage.length; i++) {
            var _key = localStorage.key(i),  //获取key
                _value = localStorage.getItem(_key);  //通过key获取value
            str += '<li class="list-group-item">' + _key +
                '<span>说：</span>' + _value +
                '</li>'
        };
        $(".messageList").html(str);
    }
})