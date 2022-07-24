window.onload = function () {
    // 指定图表的配置项和数据
    var option = {
        //backgroundColor:'#f60',  //背景颜色
        color: '#c4ccd3',  //图表的颜色
        title: {
            text: '前端发展方向',
            x: 'center',
            textStyle: {
                color: '#f60'
            }
        },
        xAxis: {   //x轴
            type: 'category',
            data: ['1月', '2月', '3', 'Thu', 'Fri', 'Sat', 'Sun'],   //x轴的数据
            axisLine: {  //x轴样式
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: { //Y轴
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        grid: {   //位置
            left: '0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        series: [{  //显示的数据
            data: [100, 200, 300, 934, 1290, 1330, 1320],
            type: 'bar'   //图表的类型   line  折线图   bar柱状图
        }]
    };
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echarts'));
    // 使用刚指定的配置项和数据显示图表。
    //myChart.setOption(option);
    // var arr = [
    //     [100, 422, 435, 934, 244, 26, 643],
    //     [324, 663, 300, 934, 325, 325, 626],
    //     [643, 222, 326, 325, 1290, 2664, 364],
    //     [2344, 666, 300, 934, 325, 1330, 1320],
    //     [432, 743, 326, 934, 263, 353, 326]
    // ];
    // //定时器
    // setInterval(getData,2000);
    // function getData(){
    //     //随机数据Math.random()   0,1   但不包含0,1   0.00001  0.99999   0-4
    //     var random = arr[parseInt(Math.random()*arr.length)];
    //     option.series[0].data = random;
    //     myChart.setOption(option);
    //     // ajax({
    //     //     success:function(data){
    //     //         option.series[0].data = data;
    //     //         myChart.setOption(option);
    //     //     }
    //     // })
    // };
    // getData();
    //websocket的写法
    //连接服务器
    var ws = new WebSocket("ws://localhost:3000");
    //连接成功触发
    ws.onopen = function () {
        alert('连接成功')
    };
    //连接失败触发
    ws.onerror = function () {
        alert('连接失败')
    };
    //接收消息时触发
    ws.onmessage = function (MessageEvent) {  //返回的数据  MessageEvent
        console.log(MessageEvent);
        var data = JSON.parse(MessageEvent.data); //"{"type":"echart","nickname":"system","message":[154,171..
        option.series[0].data = data.message;
        myChart.setOption(option);
    };

    // 指定图表的配置项和数据 
    var option2 = {
        title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 基于准备好的dom，初始化echarts实例
    var myChart2 = echarts.init(document.getElementById('echarts3'));
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);

    // 指定图表的配置项和数据
    var option3 = {
        title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 基于准备好的dom，初始化echarts实例
    var myChart3 = echarts.init(document.getElementById('echarts2'));
    // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option3);

    window.onresize = function () {
        myChart.resize();
        myChart2.resize();
        myChart3.resize();
    }
}