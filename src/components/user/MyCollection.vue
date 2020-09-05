<template>
  <div class="collection">
    <Tag color="default" v-if="!myCollections[0]" style="position: absolute;left: 50%;">空空如也，赶快来收藏八！</Tag>
    <List>
        <ListItem v-for="(item, i) in myCollections" :key="i">
            <ListItemMeta
              :avatar="item.goodsId.goodsImgs[0]"
              :title="item.goodsId.title"
              :description="item.goodsId.description"
            />
            <template slot="action">
                <li>
                  <router-link :to="'/shop/detail/'+item.goodsId._id" target="_blank">
                    <Button type="primary" size="small">查看</Button>
                  </router-link>
                </li>
                <li>
                    <Button type="error" size="small" @click="delMyCollections(item.goodsId._id)">取消收藏</Button>
                </li>
            </template>
            <div class="collectionTime">收藏时间：{{item.addTime}}</div>
        </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myCollections: []
    }
  },
  methods: {
    async getMyCollections() {
      const res = await this.$http.get('/getCollection', {
        params: {
          userId: localStorage.getItem('userId')
        }
      })
      this.myCollections = res.data
      console.log(this.myCollections)
    },
    async delMyCollections(goodsId) {
      console.log(goodsId)
      const res = await this.$http.delete('/delCollection', {
        params: {
          goodsId
        }
      })
      if (res.status === 200) {
        this.getMyCollections()
        this.$Message.success('已取消收藏！')
      } else {
        this.$Message.error('取消收藏失败！')
      }
    }
  },
  mounted() {
    this.getMyCollections()
  }
}
</script>

<style>
  .ivu-list-item-meta-description{
    height: 70px;
    overflow: hidden;
    margin-bottom: 30px;
  }
  .collectionTime{
    position: absolute;
    font-size: 12px;
    margin-top: 60px;
    margin-bottom: 10px;
  }
</style>
