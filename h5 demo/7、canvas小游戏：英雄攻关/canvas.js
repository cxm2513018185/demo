window.onload = function () {
    //获取画布元素
    var canvas = document.getElementById('canvas');
    //获得 CanvasRenderingContext2D 对象，该对象提供基本的绘图命令
    var ctx = canvas.getContext('2d');
    //初始化图片  背景  英雄  怪兽
    //图片预加载
    var bg = new Image();
    bg.src = 'image/bg.png'; //背景
    var heroImg = new Image();
    heroImg.src = 'image/hero.png'; //英雄
    var monsterImg = new Image();
    monsterImg.src = 'image/monster.png'; //怪兽

    //英雄  怪兽  默认坐标
    var hero = {
        x: 0,
        y: 0,
        speed: 1
    };
    var monster = {
        x: 0,
        y: 0
    };
    //记录得分
    var num = 0;

    //开始游戏
    var keyDown = {};
    //事件   监听键盘事件
    addEventListener("keydown", function (e) {  //按下
        //e.keyCode 获取  上38  下40  左37   右39
        keyDown[e.keyCode] = true;
    });
    addEventListener("keyup", function (e) {  //松开
        delete keyDown[e.keyCode]; //清除按下的属性
    });
    // var obj = {x:1,y:2};
    // if('x' in obj)
    function play() {
        if (38 in keyDown) { //上
            hero.y -= hero.speed;
        };
        if (40 in keyDown) { //下
            hero.y += hero.speed;
        };
        if (37 in keyDown) { //左
            hero.x -= hero.speed;
        };
        if (39 in keyDown) { //右
            hero.x += hero.speed;
        };
        if (hero.x <= (monster.x + 2) && hero.y <= (monster.y + 2) &&
            monster.x <= (hero.x + 2) && monster.y <= (hero.y + 2)) {
            num++;
            hero.x = canvas.width / 2; //攻关后，英雄位置固定的
            hero.y = canvas.height / 2;
            monster.x = Math.floor(Math.random() * canvas.width);  //怪兽位置随机获取
            monster.y = Math.floor(Math.random() * canvas.height);
        }
    };

    //游戏结束
    var flag = false;  //未结束
    function over() {
        if (hero.x <= 0 || hero.x >= canvas.width || hero.y <= 0 || hero.y >= canvas.height) {
            flag = true;
            num = 0;
            alert('游戏结束！！！')
        }
    }
    //渲染图片  文字
    function render() {
        //drawImage(img,x,y,w,h);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); //渲染图片背景
        ctx.drawImage(monsterImg, monster.x, monster.y, 30, 30); //渲染怪兽
        ctx.drawImage(heroImg, hero.x, hero.y, 30, 30); //渲染英雄
        ctx.font = "20px '微软雅黑";
        ctx.fillStyle = "#fff";
        ctx.fillText('你的得分' + num, 30, 30);
    };

    //初始化
    function init() {
        render();
        play();
        over();
        if (!flag) {
            requestAnimationFrame(init);
        }
    };
    init();
    //动画神器  requestAnimationFrame 
    requestAnimationFrame = requestAnimationFrame ||
        webkitRequestAnimationFrame ||
        mozRequestAnimationFrame ||
        msRequestAnimationFrame
}
