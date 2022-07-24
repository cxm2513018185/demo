window.onload = function () {
    new Vue({
        el: "#my",
        data: {
            totalPage:10,
            listdata: [],
            selectcpage:10,
            rows:'',
            curpage: 1,
        },
        methods: {
            loadList() {
                
                axios({
                    method: 'get',
                    url: `http://localhost:3000/home/page/${this.curpage}/${this.selectcpage}`,
                }).then(res => {
                    console.log(res.data)
                    let { data, pageTotal,  rows} = res.data;
                    this.listdata = data;
                    this.totalPage = pageTotal;
                    this.rows = rows;
                })
            },
            cpage(v) {
                if(typeof(v)== "number"){
                    this.curpage = v;
                    this.loadList()}                 
                
            },
            prevpage() {
                if (this.curpage > 1) {
                    this.curpage--;
                    this.loadList()
                }

            },
            nextpage() {
                if (this.curpage < this.totalPage) {
                    this.curpage++;
                    this.loadList()
                }
            },
            changecpage(){
                this.loadList()
            }
        },
        computed: {
            totoalpage() {
                return this.totalPage =  Math.ceil(this.rows / this.selectcpage)
            },
            showPageBtn() {
                let pageNum = Number(this.totalPage),
                    index = Number(this.curpage),
                    arr = [];
                if (pageNum <= 9) {
                    for (let i = 1; i <= pageNum; i++) {
                        arr.push(i)
                    }
                    return arr
                }
                if (index < 5) return [1, 2, 3, 4, 5, 6, 7, '...', pageNum]
                if (index >= pageNum - 1) return [1, 2, '...', pageNum - 5, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
                if (index == pageNum - 2) return [1, 2, '...', pageNum - 5, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
                return [1, '...', index - 2, index - 1, index, index + 1, index + 2, '...', pageNum]

            }
        },
        mounted() {
            this.loadList();
            
        },
        filters: {
            rmb(data) {
                return "¥" + data + ".00"
            }
        }
    })

}