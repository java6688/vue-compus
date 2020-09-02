<template>
<div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger :collapsed-width="78">
                <Aside :asideActive="asideActive"></Aside>
            </Sider>
            <Layout>
                <Header></Header>
                <Content :style="{margin: '20px', minHeight: '260px'}">
                    <Goods></Goods>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
// import Aside from '../../components/admin/Aside.vue'
// import Header from '../../components/admin/Header.vue'
// import Goods from '../../components/admin/Goods.vue'
const Aside = ()=>import('@components/admin/Aside.vue')
const Header = ()=>import('@components/admin/Header.vue')
const Goods = ()=>import('@components/admin/Goods.vue')
export default {
  components: {
    Aside,
    Header,
    Goods
  },
  data () {
    return {
      asideActive: '1-2'
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
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      height: calc(100vh);
  }
  .layout-header-bar{
      background: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
      width: 90%;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
  }
  .menu-icon{
      transition: all .3s;
  }
  .rotate-icon{
      transform: rotate(-90deg);
  }
  .menu-item span{
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width .2s ease .2s;
  }
  .menu-item i{
      transform: translateX(0px);
      transition: font-size .2s ease, transform .2s ease;
      vertical-align: middle;
      font-size: 16px;
  }
  .collapsed-menu span{
      width: 0px;
      transition: width .2s ease;
  }
  .collapsed-menu i{
      transform: translateX(5px);
      transition: font-size .2s ease .2s, transform .2s ease .2s;
      vertical-align: middle;
      font-size: 22px;
  }
</style>
