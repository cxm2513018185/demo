window.onload = function(){
    new Vue({
        el: '#app',
        data:{
            shopList:[
                { name: '手机',state: false }
            ],
            name: '',
            noShopNum: 0,
        },
        filters:{
            initState(state){
                switch(state){
                    case true:
                       return '已采购';
                    case false:
                        return '未采购';
                }
            }
        },
        mounted(){
            this.getShopList();
        },
        methods:{
            getShopList(){
                let shopObj = localStorage.getItem('shopList');
                if(shopObj){
                    this.shopList = JSON.parse(shopObj);
                    this.nonum();
                }
            },
            addShop(){
                let shopObj = {};
                shopObj.name = this.name;
                shopObj.state = false;
                if(!this.name){
                    alert('请输入要添加的商品');
                    return;
                }else {
                    this.shopList.unshift(shopObj);
                    localStorage.setItem('shopList',JSON.stringify(this.shopList));
                    this.name = '';
                    this.nonum();
                }
            },
            delShop(name){
                if(confirm('确定要删除此商品吗？')){
                    this.shopList = this.shopList.filter(item => item.name !== name);
                    localStorage.setItem('shopList',JSON.stringify(this.shopList));
                    this.getShopList();
                    this.nonum();
                    return true;
                 } else {
                    return false;
                 }
            },
            nonum(){
                if(this.shopList){
                    this.noShopNum = this.shopList.filter(item => item.state === false).length;
                    localStorage.setItem('shopList',JSON.stringify(this.shopList));
                }
            },
            changeList(){
                this.nonum();
            }
        }
        
    })
}