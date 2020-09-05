<template>
  <Menu mode="horizontal" :theme="theme1"
    :active-name="show"
    style="height: 63px;"
   >
    <router-link to="/">
      <div class="layout-logo">
        <img style="display: inline-block;width: 100%;height: 100%;" src="/logo.png" alt="校园集市">
      </div>
    </router-link>
    <Input v-if="currentUrl !== '/'" class="search" search placeholder="请输入需要搜索的内容"
      v-model="keyword"
      :autofocus="true"
      @on-search="searchGoods"
      style="width: 200px;"
    />
    <div class="layout-nav">
        <router-link to="/">
          <MenuItem name="1">首页</MenuItem>
        </router-link>
        <!-- <router-link to="/#/shop">
          <MenuItem name="2">集市</MenuItem>
        </router-link> -->
        <router-link to="/shop">
          <MenuItem name="2">集市</MenuItem>
        </router-link>
        <router-link to="/upload_goods">
          <MenuItem name="3">发布</MenuItem>
        </router-link>
        <router-link to="/news">
          <MenuItem name="4">校园动态</MenuItem>
        </router-link>
<!--        <router-link to="/user">
          <MenuItem name="5">个人中心</MenuItem>
        </router-link> -->
        <div class="demo-avatar">
            <!-- <Avatar icon="ios-person" /> -->
            <router-link :to="username ? '/user' : '/login'">
              <img :src="avatarUrl ? avatarUrl : defaultAvatar" class="avatar">
            </router-link>
            <!-- <img :src="avatarUrl" alt=""> -->
            <Dropdown style="margin-left: 20px">
                <router-link :to="username ? '' : '/login'">
                    {{nickname || username ? nickname || username : '登录'}}
                    <Icon type="ios-arrow-down" v-show="username"></Icon>
                </router-link>
                <DropdownMenu slot="list" v-show="username">
                    <DropdownItem>
                        <router-link to="/user">
                          个人中心
                        </router-link>
                     </DropdownItem>
                    <DropdownItem @click.native="clearLocalStorage">退出登录</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
  </Menu>
</template>

<script>
export default {
  props: [
    'show',
    'avatar'
  ],
  data () {
    return {
      keyword: '',
      currentUrl: '',
      // 导航栏主题
      theme1: 'light',
      // 导航栏激活控件
      activeName: '2',
      username: '',
      nickname: '',
      avatarUrl: '',
      defaultAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596303462534&di=77780457c88d6f77e8d2431c0b3ed309&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F56%2F69%2F575747cfd0cfe1a.jpg'
    }
  },
  methods: {
    getLoginUser() {
      this.username = localStorage.getItem('username')
      this.nickname = localStorage.getItem('nickname')
      this.avatarUrl = localStorage.getItem('avatarUrl')
    },
    clearLocalStorage() {
      localStorage.removeItem('username')
      localStorage.removeItem('nickname')
      localStorage.removeItem('userId')
      localStorage.removeItem('avatarUrl')
      this.username = ''
      this.nickname = ''
      this.avatarUrl = ''
      // this.$router.go(0)
    },
    async searchGoods() {
      this.$router.push({
        path: '/shop',
        query: {
          keyword: this.keyword
        }
      })
      // 搜索后清空输入框
      this.keyword = ''
    }
  },
  mounted() {
    this.getLoginUser()
    this.currentUrl = this.$route.path
  },
  watch: {
    avatar() {
      this.avatarUrl = this.avatar
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
  }
  .avatar{
    width: 30px;
    height: 30px;
    // background-color: aqua;
    border-radius: 50%;
    transform: translateY(40%);
  }
  .login{
    display: inline-block;
    margin-left: 6px;
  }
  .layout-logo{
    width: 180px;
    height: 100%;
    /* background: #5b6270; */
    border-radius: 3px;
    float: left;
    position: relative;
    // top: 15px;
    // left: 20px;
  }
  .layout-nav{
    float: right;
    display: inline-block;
    // width: 500px;
    margin: 0 auto;
    margin-right: 50px;
  }
  .layout-nav a{
    display: inline-block;
    color: grey;
    /* width: 68px; */
  }
  .demo-avatar{
    display: inline-block;
    margin-left: 10px;
    float: right;
  }
  .layout{
    .ivu-menu-light{
      padding: 0 20px;
    }
  }
</style>
