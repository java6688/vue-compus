<template>
  <div class="myNews">
    <Tag color="default" v-if="!myNews[0]" style="position: absolute;left: 50%;">空空如也，赶快来收藏八！</Tag>
   <div class="item" v-for="(item, index) of myNews" :key="item.id">
      <div class="content" v-html="item.content"></div>
       <div class="pubTime">发布时间：{{item.publishTime}}</div>
       <!-- <router-link :to="{path: '/'}" target="_blank">
         <Button class="btn" type="primary" size="small">编辑</Button>
       </router-link> -->
       <Button class="btn" type="error" size="small" @click="delMyNews(item._id)">删除</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myNews: [],
      userId: ''
    }
  },
  methods: {
    async getMyNews() {
      const res = await this.$http.get('/getMyNews', {
        params: {
          userId: this.userId
        }
      })
      this.myNews = res.data
      console.log(this.myNews)
    },
    async delMyNews(id) {
      const res = await this.$http.delete('/delMyNews', {
        params: {
          id
        }
      })
      if(res.status === 200) {
        this.$Message.success('删除成功！')
        this.getMyNews()
      } else {
        this.$Message.success('删除失败！')
      }
    }
  },
  mounted() {
    this.userId = localStorage.getItem('userId')
    this.getMyNews()
  }
}
</script>

<style lang="less" scoped>
  .item{
    padding-bottom: 10px;
    border-bottom: 1px solid gainsboro;
    min-height: 100px;
    .content{
      padding: 10px 0;
    }
    .btn{
      margin: 5px;
    }
  }
</style>
