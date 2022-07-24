window.onload = function () {
  new Vue({
    el: '#app',
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      onClickLogin(formName) {
        this.validateForm(formName, this.onLogin);
      },

      onClickRegister(formName) {
        this.validateForm(formName, this.onRegister);
      },

      // 验证表单内容
      validateForm(formName, callback) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            callback();
          } else {
            return false;
          }
        });
      },

      // 登录
      onLogin() {
        $http.request({
          type: 'POST',
          url: '/user/login',
          data: {
            ...this.ruleForm,
          },
          success: function(res) {
            const { flag } = res;
            if (flag) {
              alert('用户登录成功！');
              location.href = 'index.html';
            } else {
              alert('用户名或密码错误！');
            }
          },
          error: function(err) {
            console.log('err: ', err);
            alert('服务器开小差了~');
          }
        })
      },

      // 注册
      onRegister() {
          $http.request({
            type: 'POST',
            url: '/user/register',
            data: {
              ...this.ruleForm,
            },
            success: function(res) {
              const { flag } = res;
              if (flag) {
                alert('用户注册成功');
                location.href = 'login.html';
              } else {
                alert('该用户已存在');
              }
            },
            error: function(err) {
              console.log('err: ', err);
              alert('服务器开小差了~');
            }
          })
      }
    }
  })
}