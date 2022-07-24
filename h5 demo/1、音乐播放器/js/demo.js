window.onload = function () {
    //截取歌名
    function intercept(text) {
        var index = text.lastIndexOf('\/');
        var str = text.substring(index + 1, text.length);
        return str;
    };
    //选择器
    function fun(name) {
        return document.getElementById(name);
    };
    //初始化
    var musicList = ['./music/光辉岁月.mp3', './music/老男孩.mp3', './music/时间都去哪儿了.mp3'];//歌曲列表
    var num = 2; //默认值
    var audio = fun("audio");
    show();
    //展示
    function show() {
        audio.src = musicList[num];  //默认音乐
        fun("musicName").innerHTML = intercept(musicList[num]);//列表名称
    };
    //开始
    fun("play").onclick = function () {
        if (audio.paused) {
            audio.play();
        }
    };
    //暂停
    fun("pause").onclick = function () {
        if (audio.played) {
            audio.pause();
        }
    };
    //上一首
    fun("prev").onclick = function () {
        num--;
        if (num < 0) {
            num = musicList.length - 1;
        };
        show();
        audio.play();
    };
    //下一首
    fun("next").onclick = function () {
        num++;
        if (num == musicList.length) {
            num = 0;
        };
        show();
        audio.play();
    }
}