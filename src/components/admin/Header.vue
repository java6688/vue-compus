
<template>
  <Header :style="{padding: 0}" class="layout-header-bar">
      <div class="fr">
        <Dropdown style="margin-left: 20px" placement="bottom-end">
            <a href="javascript:void(0)">
                用户：{{username}}
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>个人资料</DropdownItem>
                <DropdownItem @click.native="clearSessionStorage">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </div>
  </Header>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    clearSessionStorage() {
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('username')
      this.$router.push('/admin/login')
    }
  },
  mounted() {
    this.username = sessionStorage.getItem('username')
  }
}
</script>

<style lang="less" scoped>
  .fr{
    float: right;
    margin-right: 60px;
    a{
      color: gray;
    }
  }
</style>
