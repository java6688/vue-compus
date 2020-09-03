<template>
  <div class="layout">
      <Header :show="activeName"></Header>
      <Content :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '20px 0'}">
              您当前的位置为：
              <BreadcrumbItem>首页</BreadcrumbItem>
              <BreadcrumbItem>集市</BreadcrumbItem>
              <BreadcrumbItem>{{currentCate?currentCate:'所有分类'}}</BreadcrumbItem>
          </Breadcrumb>
          <Card>
              <div style="min-height: 200px;">
                  <Goods @current-cate="getCurrentCate" v-show="contentShow"></Goods>
              </div>
              <BackTop :height="400"></BackTop>
          </Card>
      </Content>
      <Footer></Footer>
  </div>
</template>

<script>
const Header = ()=>import('@components/header/Header.vue')
const Footer = ()=>import('@components/Footer.vue')
const Goods = ()=>import('@components/shop/Goods.vue')
export default {
  name: 'Shop',
  components: {
    Goods,
    Footer,
    Header
  },
  data() {
    return {
      // 控制导航栏激活状态
      activeName: '2',
      contentShow: true,
      currentCate: ''
    }
  },
  methods: {
    getCurrentCate(value) {
      this.currentCate = value
    }
  }
}
</script>

<style scoped>

</style>
