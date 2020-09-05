<template>
  <div class="layout">
    <Header :show="activeName"></Header>
    <div class="home">
        <h1>校园集市</h1>
        <h3>————让校园市场动态触手可及————</h3>
        <Input class="search" search placeholder="请输入需要搜索的内容"
          v-model="keyword"
          :autofocus="true"
          @on-search="searchGoods"
          size="large"
          style="width: 800px;"
        />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Header: ()=>import('@components/header/Header.vue'),
    Footer: ()=>import('@components/Footer.vue')
  },
  data() {
    return {
      // 控制导航栏激活状态
      activeName: '1',
      keyword: ''
    }
  },
  methods: {
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
  }
}
</script>

<style lang="less" scoped>
  .home{
    padding-top: 100px;
    height: 100vh;
    width: 100%;
    text-align: center;
    background-image: url('https://s1.ax1x.com/2020/09/02/w9puXn.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .search{
      margin-top: 100px;
      border: 2px solid darkcyan;
      border-radius: 5px;
    }
  }
</style>
