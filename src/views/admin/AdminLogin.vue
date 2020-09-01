<template>
  <div class="loginPage">
      <div class="wrapper">
        <div class="topTitle">
          <h1>校园集市</h1>
          <h3>————后台管理系统————</h3>
        </div>
        <Card>
          <div class="logo"></div>
          <Form class="form" ref="formUser" :model="formUser" :rules="ruleUser" :label-width="80">
              <FormItem label="用户名" prop="username">
                  <Input type="text" v-model="formUser.username" clearable placeholder="请输入用户名"></Input>
              </FormItem>
              <FormItem label="密码" prop="password">
                  <Input type="password" password v-model="formUser.password" placeholder="请输入密码"></Input>
              </FormItem>
              <FormItem>
                  <Button class="loginBtn" type="primary" @click="handleSubmit('formUser')">登录</Button>
              </FormItem>
          </Form>
        </Card>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formUser: {
        username: '',
        password: ''
      },
      ruleUser: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于六位！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('/admin/login', this.formUser)
          if (res.status === 200 && res.data.role === 'admin') {
            // localStorage（长期存储）与 sessionStorage 一样，但是浏览器关闭后，数据依然会一直存在
            // 跳转前设置
            sessionStorage.setItem('role', res.data.role)
            sessionStorage.setItem('username', res.data.username)
            this.$router.push('/admin/home')
            console.log(res)
            this.$Message.success('登录成功!')
          } else {
            this.$Message.error('登录失败!')
          }
        } else {
          this.$Message.error('登录失败!')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .loginPage{
    // height: 657px;
    height: calc(100vh);
    padding-top: 80px;
    text-align: center;
    background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596008674053&di=2ee4cc5d173b2f36c6974ba7be4d347a&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fnature%2FAmazing_Color_Landscape_2560x1600%2Fwallpapers%2F1366x768%2FAmazing_Landscape_22_II.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .wrapper{
      width: 500px;
      // padding: 100px 0;
      margin: 0 auto;
      .loginBtn{
        // margin-left: -25px;
        width: 100%;
      }
      .registerBtn{
         // margin-left: 8px;
         width: 100%;
      }
      .topTitle{
        margin-bottom: 60px;
      }
      .logo{
        width: 100px;
        height: 100px;
        background-color: darkcyan;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: -70px;
        margin-bottom: 30px;
      }
      .form{
        padding: 0 50px;
      }
    }
  }
</style>
