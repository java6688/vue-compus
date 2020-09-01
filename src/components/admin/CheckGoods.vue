<template>
  <div>
    <Table border :columns="columns7" :data="goodsData"></Table>
    <div class="pagination">
      <Page :total="total" show-elevator show-sizer show-total
        :current="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :page-size-opts="[2, 5, 10, 20]"
        @on-change="PageNumChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        // 当前页
        pageNum: 1,
        // 每页显示条数
        pageSize: 10
      },
      // 总页数
      total: 10,
      columns7: [
        {
          title: '发布者',
          key: 'seller.username',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.seller.username)
            ])
          }
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '分类',
          key: 'category'
        },
        {
          title: '发布时间',
          key: 'uploadTime'
        },
        {
          title: '审核状态',
          key: 'check'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  fontSize: '12px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '更多'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  fontSize: '12px'
                },
                on: {
                  click: () => {
                    this.pass(params.row._id)
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  fontSize: '12px'
                },
                on: {
                  click: () => {
                    this.remove(params.index, params.row._id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      goodsData: []
    }
  },
  methods: {
    show (index) {
      console.log('更多')
      this.$Modal.info({
        title: '更多信息',
        content: `QQ：${this.goodsData[index].qq}<br>微信：${this.goodsData[index].wx}<br>手机号码：${this.goodsData[index].phone}
        <br><div>商品图片：</div><img style="width:100px;height:100px;" src="${this.goodsData[index].goodsImgs[0]}" />
        <img style="width:100px;height:100px;" src="${this.goodsData[index].goodsImgs[1]}" />
        <img style="width:100px;height:100px;" src="${this.goodsData[index].goodsImgs[2]}" />
        <img style="width:100px;height:100px;" src="${this.goodsData[index].goodsImgs[3]}" />
        <img style="width:100px;height:100px;"  src="${this.goodsData[index].goodsImgs[4]}" />`
      })
    },
    // 审核通过
    async pass(id) {
      const res = await this.$http.post('/admin/pass', {
        id,
        check: 1
      })
      if (res.status === 200) {
        this.$Message.success('审核通过！')
        this.getGoods()
      } else {
        this.$Message.error('审核失败！')
      }
    },
    async remove (index, id) {
      const res = await this.$http.delete('/admin/delGoods', {
        params: {
          id
        }
      })
      if (res.status === 200) {
        this.$Message.success('删除商品成功！')
      } else {
        this.$Message.error('删除商品失败！')
      }
      this.goodsData.splice(index, 1)
      this.getGoods()
    },
    // 页码改变的回调，返回改变后的页码
    async PageNumChange(pageNum) {
      this.queryInfo.pageNum = pageNum
      const res = await this.$http.get('/admin/check', {
        params: this.queryInfo
      })
      this.goodsData = res.data.records
      console.log(res)
    },
    // 切换每页条数时的回调，返回切换后的每页条数
    async pageSizeChange(pageSize) {
      this.queryInfo.pageSize = pageSize
      const res = await this.$http.get('/admin/check', {
        params: this.queryInfo
      })
      this.goodsData = res.data.records
      console.log(res)
    },
    async getGoods() {
      const res = await this.$http.get('/admin/check', {
        params: this.queryInfo
      })
      this.goodsData = res.data.records
      this.total = res.data.total
      console.log(res)
    }
  },
  mounted() {
    this.getGoods()
  }
}
</script>

<style scoped>
</style>
