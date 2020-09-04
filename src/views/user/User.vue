<template>
  <div class="user">
    <div class="layout">
      <Layout>
          <Header :show="activeName" :avatar="avatarUrl"></Header>
          <Card style="width: 1000px;height: 700px;margin: 36px auto; overflow: hidden;">
              <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                  <Layout>
                      <Sider hide-trigger :style="{background: '#fff'}">
                          <Menu class="menu" style="height: 600px;" :active-name="asideName" theme="light" width="auto" :open-names="['1']">
                            <router-link to="/user">
                              <MenuItem name="1-1">
                                <span>我的资料</span>
                              </MenuItem>
                            </router-link>
                            <router-link to="/mygoods">
                              <MenuItem name="1-2">
                                <span>我的物品</span>
                              </MenuItem>
                            </router-link>
                            <router-link to="/mycollections">
                              <MenuItem name="1-3">
                                <span>我的收藏</span>
                              </MenuItem>
                            </router-link>
                            <router-link to="/mynews">
                              <MenuItem name="1-4">
                                <span>我的动态</span>
                              </MenuItem>
                            </router-link>
                          </Menu>
                      </Sider>
                      <Content :style="{padding: '0 24px', minHeight: '280px', background: '#fff'}">
                        <UserInfo @updateAvatar="updateAvatar"></UserInfo>
<!--                        <MyGoods v-show="myGoods"></MyGoods>
                        <MyCollection v-show="myCollection"></MyCollection>
                        <MyNews v-show="myNews"></MyNews> -->
                      </Content>
                  </Layout>
              </Content>
          </Card>
          <Footer></Footer>
        </Layout>
      </div>
    </div>
  </div>
</template>

<script>
const Header = ()=>import('@components/header/Header.vue')
const Footer = ()=>import('@components/Footer.vue')
const UserInfo = ()=>import('@components/user/UserInfo.vue')
export default {
  name: 'User',
  components: {
    Header,
    Footer,
    UserInfo
  },
  data() {
    return {
      // 控制导航栏激活状态
      activeName: '5',
      // 个人中心侧边栏激活控件
      asideName: '1-1',
      avatarUrl: '',
      editNickname: ''
    }
  },
  methods: {
    updateAvatar(data) {
      this.avatarUrl = data
    }
  },
  mounted() {
    if (!localStorage.getItem('username')) {
      this.$Message.warning('请先登录！')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  // 侧边栏菜单默认样式
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    padding: 0;
  }
  .menu{
    span{
      display: block;
      padding: 14px 24px;
    }
  }
</style>
