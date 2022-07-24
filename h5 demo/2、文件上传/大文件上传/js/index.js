var BigFileUpload = {
    chunkSize: 2 * 1024 * 1024, //  分片大小   设置2M
    fileSlice: File.prototype.slice,  //对文件进行分割
    init() {
        $('#submitBtn').on('click', () => {
            var files = document.getElementById("file").files;
            var file = files[0];  //获取文件
            console.log(file);
            if (!file) return;  //没有上传文件结束
            //分片总数
            var count = Math.ceil(file.size / this.chunkSize);
            //时间戳
            var timestamp = new Date().getTime() + "";
            //缓存请求
            var axiosArray = [];
            for (var i = 0; i < count; i++) {
                var start = i * this.chunkSize;
                var end = Math.min(file.size, start + this.chunkSize);  //Math.min(1,2,4)
                //构建表单
                var fd = new FormData();  //通过formData将文件转成二进制数据（流）;
                fd.append('file', this.fileSlice.call(file, start, end));  //切割的一部分文件
                fd.append('name', file.name);  //文件的名称
                fd.append('total', count); //分片的总数
                fd.append('size', file.size);  //文件的大小
                fd.append('index', i); //当前索引
                fd.append('hash', timestamp);  //时间戳
                //发送请求 缓存请求
                axiosArray.push(axios.post('http://localhost:3000/file/upload', fd));
            };
            //axios.all()  请求都成功后，返回结果，只要有一个请求没有成功，都不会执行then
            // axios.all(axiosArray).then(d=>{  
            //     //所有分片的请求都发送成功后的处理
            //     var data = {
            //         size:file.size,
            //         name:file.name,
            //         total:count,
            //         hash:timestamp
            //     };
            //     axios.post('http://localhost:3000/file/merge_chunks',data).then(res=>{
            //         if(res.data.msg =='success') {
            //             console.log('上传成功');
            //         }
            //     })
            // })
            //异步同步化的处理  async await
            // async function fun(){
            //     console.log(1);
            //     await fun2(); //
            //     console.log(2);
            // }
            async function run(arr) {
                for (var i = 0; i < arr.length; i++) {
                    await arr[i];//每一个请求
                    //添加进度条数据
                    var n = (i / arr.length * 100) + '%';
                    console.log(n);
                    $(".bars div").width(n);
                    $(".bars span").text(n);
                }
                var data = {
                    size: file.size,
                    name: file.name,
                    total: count,
                    hash: timestamp
                };
                axios.post('http://localhost:3000/file/merge_chunks', data).then(res => {
                    console.log(res);
                    if (res.data.msg == 'success') {
                        console.log('上传成功');
                        $(".bars div").width('100%');
                        $(".bars span").text('100%');
                    }
                })
            };
            run(axiosArray);

        })
    }
};
window.onload = function () {
    BigFileUpload.init();
}