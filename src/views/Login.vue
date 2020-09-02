<template>
  <div class="loginPage">
    <div class="wrapper">
      <div class="topTitle">
        <h1>校园集市</h1>
        <h3>————让校园市场动态触手可及————</h3>
      </div>
      <Card>
        <Tabs>
            <TabPane label="登录">
              <!-- <div class="logo"></div> -->
              <Form class="form" ref="loginUser" :model="loginUser" :rules="ruleUser" :label-width="80">
                  <FormItem label="用户名" prop="username">
                      <Input type="text" v-model="loginUser.username" clearable placeholder="请输入用户名"></Input>
                  </FormItem>
                  <FormItem label="密码" prop="password">
                      <Input type="password" password v-model="loginUser.password" placeholder="请输入密码"></Input>
                  </FormItem>
                  <FormItem>
                      <Button class="loginBtn" type="primary" @click="handleLoginSubmit('loginUser')">登录</Button>
                  </FormItem>
              </Form>
            </TabPane>
<!--            <TabPane label="" disabled>标签二的内容</TabPane> -->
            <TabPane label="注册">
                <!-- <div class="logo"></div> -->
                <Form class="form" ref="registerUser" :model="registerUser" :rules="ruleUser" :label-width="80">
                    <FormItem label="用户名" prop="username">
                        <Input type="text" v-model="registerUser.username" clearable placeholder="用户名只能由英文或数字组成"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input type="password" password v-model="registerUser.password" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="againPassword">
                        <Input type="password" password v-model="registerUser.againPassword" placeholder="请再次输入密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button class="registerBtn" type="success" @click="handleRegisterSubmit('registerUser')">注册</Button>
                    </FormItem>
                </Form>
            </TabPane>
        </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单
      loginUser: {
        username: '',
        password: ''
      },
      // 注册表单
      registerUser: {
        username: '',
        password: '',
        againPassword: ''
      },
      // 共同验证规则
      ruleUser: {
        username: [
          { required: true, message: '用户名只能由英文或数字组成', trigger: 'blur' },
          { type: 'string', min: 2, max: 20, message: '用户名可以输入2-20位！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, max: 20, message: '密码只能取6-20位！', trigger: 'blur' }
        ],
        againPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录提交事件
    handleLoginSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('/login', this.loginUser)
          console.log(res)
          if (res.status === 200) {
            // this.$router.push('/')
            this.$router.go(-1)
            this.$Message.success('登录成功')
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('userId', res.data.id)
            if (res.data.avatarUrl) {
              console.log(res.data.avatarUrl)
              localStorage.setItem('avatarUrl', res.data.avatarUrl)
            }
            console.log(res.data.id)
          } else {
            this.$Message.error(res.data.msg)
          }
        } else {
          this.$Message.error('登录失败!')
        }
      })
    },
    // 注册提交事件
    handleRegisterSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('/register', this.registerUser)
          console.log(res)
          if (res.status === 200) {
            this.$Message.success(res.data.msg)
          } else {
            this.$Message.error(res.data.msg)
          }
        } else {
          this.$Message.error('注册失败!')
        }
      })
    },
    // 注册确认密码验证
    checkAgainPassword() {
      if (this.loginUser.password !== this.loginUser.againPassword) {
        return this.$Message.error('两次输入的密码不一致!')
      } else {
        return this.$Message.success('注册成功!')
      }
    }
  },
  watch: {
    // 限制用户名只能是英文或数字
    'registerUser.username'() {
      this.registerUser.username = this.registerUser.username.replace(/[\W]/g, '')
      // console.log(this.registerUser.username)
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
  background-image: url('https://s1.ax1x.com/2020/09/02/w9puXn.jpg');
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
      margin-bottom: 30px;
    }
    .logo{
      width: 100px;
      height: 100px;
      background-color: darkcyan;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -80px;
      margin-bottom: 30px;
    }
    .form{
      padding: 0 50px;
    }
  }
}
</style>
