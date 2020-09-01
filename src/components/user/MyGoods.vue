<template>
  <div class="mygoods">
    <Tag color="default" v-if="!myGoods[0]" style="position: absolute;left: 50%;">空空如也，赶快来发布宝贝八！</Tag>
    <List>
        <ListItem v-for="(item, i) in myGoods" :key="i">
            <ListItemMeta
              :avatar="item.goodsImgs[0]"
              :title="item.title"
              :description="item.description"
            />
            <template slot="action">
              <li>
                  <Button type="warning" size="small" v-if="item.check === 0">待审核</Button>
              </li>
                <li>
                  <router-link :to="{path:'/goods_edit', query:item}" target="_blank">
                    <Button type="primary" size="small" @click="goodsEdit">编辑</Button>
                  </router-link>
                </li>
                <li>
                    <Button type="error" size="small" @click="delMyGoods(item._id)">删除</Button>
                    <!-- <a href="javascript:;" :onclick="delMyGoods">删除</a> -->
                </li>
            </template>
            <div class="collectionTime">发布时间：{{item.uploadTime}}</div>
        </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myGoods: []
    }
  },
  methods: {
    async getMyGoods() {
      const res = await this.$http.get('/myGoods', {
        params: {
          userId: localStorage.getItem('userId')
        }
      })
      this.myGoods = res.data
    },
    async delMyGoods(id) {
      console.log(id)
      const res = await this.$http.delete('/delMyGoods', {
        params: {
          id
        }
      })
      console.log(res)
      if (res.status === 200) {
        this.getMyGoods()
        this.$Message.success('删除商品成功！')
      } else {
        this.$Message.error('删除商品失败！')
      }
    },
    goodsEdit() {
      // this.
    }
  },
  mounted() {
    this.getMyGoods()
  }
}
</script>

<style>
</style>
