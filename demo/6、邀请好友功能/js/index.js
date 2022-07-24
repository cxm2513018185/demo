window.onload = function() {
    new Vue({
        el: "#my-app",
        data: {
            lists: [
                {name: "白敬亭", qq: 3533189321, id: 1, state: false},
                {name: "李宏毅", qq: 3153432134, id: 2, state: false},
                {name: "赵露思", qq: 454542454, id: 3, state: false},
                {name: "迪丽热巴", qq: 78964365, id: 4, state: false},
                {name: "肖战", qq: 6783412, id: 5, state: false},
                {name: "李荣浩", qq: 674369632, id: 6, state: false},
                {name: "杨洋", qq: 89753432, id: 7, state: false},
                {name: "赵丽颖", qq: 67465328, id: 8, state: false},
                {name: "Angelababy", qq: 678563432, id: 9, state: false},
            ],
            selected: [],
            flag: 'hide'
        },
        methods: {
            addFriends: function(item) {
                // 改变item里面state的值
                item.state = true;
                // 去重 es5 通过id
                // for(var i=0; i<this.selected.length; i++) {
                //     if(this.selected[i].id == item.id) {
                //         return;
                //     }
                // }
                this.selected.push(item);
                // es6 Set
                this.selected = [...new Set(this.selected)];
            },
            delFriends: function(item, index) {
                this.selected.splice(index, 1);
                this.lists.forEach(i => {
                    if(i.id == item.id) {
                        i.state = false;
                    }
                });
            }
        }
    })
}