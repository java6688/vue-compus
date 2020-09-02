<template>
      <Menu :active-name="asideActive" theme="dark" width="auto" :class="menuitemClasses">
          <a href="/admin/home">
            <h2 class="topBar">
              校园集市
            </h2>
          </a>
          <a href="/admin/user">
            <MenuItem name="1-1">
                <Icon type="ios-navigate"></Icon>
                <span>用户管理</span>
            </MenuItem>
          </a>
          <a href="/admin/goods">
            <MenuItem name="1-2">
                <Icon type="ios-search"></Icon>
                <span>商品管理</span>
            </MenuItem>
          </a>
          <a href="/admin/check">
            <MenuItem name="1-3">
                <Icon type="ios-apps" />
                <span>商品审核</span>
            </MenuItem>
          </a>
          <a href="/admin/feedback">
            <MenuItem name="1-4">
                <Icon type="ios-albums" />
                <span>反馈中心</span>
            </MenuItem>
          </a>
      </Menu>
</template>

<script>
export default {
  props: [
    'asideActive'
  ],
  computed: {
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  }
}
</script>

<style scoped>
  .topBar{
    height: 64px;
    line-height: 64px;
    color: #fafafa;
    text-indent: 26px;
    /* text-align: center; */
    background-color: #2d8cf0;
  }
</style>
