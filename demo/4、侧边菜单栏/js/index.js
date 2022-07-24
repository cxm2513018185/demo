window.onload = function() {
    var app = new Vue({
        el:"#app",
        data:{
            current: 0,
            slideTitle:'猫眼电影',
            slideData:[
                {   
                    icon:'icon-yingyuan',
                    mainTitle:'我的影院',
                    subData:[
                        {icon:'icon-leimupinleifenleileibie',subTitle:'喜剧片'},
                        {icon:'icon-leimupinleifenleileibie',subTitle:'科幻片'},
                        {icon:'icon-leimupinleifenleileibie',subTitle:'动作片'},
                    ]
                },
                {
                    icon:'icon-dianying',
                    mainTitle:'我的电影',
                    subData:[
                        {icon:'icon-shipin',subTitle:'战狼3'},
                        {icon:'icon-shipin',subTitle:'攀登者'},
                        {icon:'icon-shipin',subTitle:'中国机长'},
                    ]
                },
                {
                    icon:'icon-wode',
                    mainTitle:'个人中心',
                    subData:[
                        {icon:'icon-gerenxinxi',subTitle:'个人信息'},
                        {icon:'icon-xiugaimima',subTitle:'修改密码'},
                        {icon:'icon-shezhi',subTitle:'设置'},
                    ]
                }
            ]
        },
    })
}