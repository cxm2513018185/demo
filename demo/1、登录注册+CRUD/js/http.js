// Ajax请求封装
const $http = (function(){
  // 获取http对象
  function getXMLHttpRequest(){
      let http;
      if (window.ActiveXObject) {
          http = new ActiveXObject("MicroSoft.XMLHTTP");
      } else if (window.XMLHttpRequest) {
          http = new XMLHttpRequest();
      } else {
          alert("您的浏览器版本过低，请升级");
      }
      return http;
  }

  // 定义默认请求参数
  function Config(options = {}){
      this.baseUrl = "http://localhost:3000";
      this.type = options.type || "POST";
      this.data = options.data || {};
      this.contentType = options.contentType || "application/json";
      this.dataType = options.dataType || "JSON";
      this.async = options.async || true;
      this.success = options.success || function() {};
      this.error = options.error || function() {
        alert('服务器开小差了~');
      };
  }

  // 处理请求参数
  function ProcessArg(options = {}){
      Config.call(this, options);
      if (options.url) { // url为必选参数,未指定时抛出异常
          this.url = this.baseUrl + options.url
      } else {
          throw "httpError: url is undefined!";
      }
  }

  // 请求对象
  function Request(){
      this.request = function(options = {}){
          let process = new ProcessArg(options);
          let http = getXMLHttpRequest();

          http.open(process.type, process.url, process.async);
          http.setRequestHeader("Content-type", process.contentType); // 必须设置请求头
          http.send(JSON.stringify(process.data));
          http.onreadystatechange = function() {
              if (http.readyState === 4) { 
                  if (http.status === 200) {
                    let res;
                    if (process.dataType.toLowerCase() === "json") { // 判断指定的返回数据类型是否为json，如果是就转为json对象
                        res = JSON.parse(http.responseText)
                    }
                    process.success(res);
                  } else {
                    process.error(http.response);
                  }
              }
          }
      }
  }

  return new Request();
})()