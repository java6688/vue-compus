<template>
  <div>
    <Table border :columns="columns7" :data="userInfo"></Table>
    <Modal
        v-model="visibleDialog"
        title="确认删除该用户吗？"
        :loading="loading"
        @on-ok="asyncOK">
        <p>用户名：{{delUserData.username}}</p>
        <p>姓名：{{delUserData.realName}}</p>
        <p>性别：{{delUserData.gender}}</p>
        <p>学校：{{delUserData.location}}</p>
        <p>毕业年份：{{delUserData.graduationDate}}</p>
        <p>角色：{{delUserData.role === 'admin' ? '超级管理员' : '普通用户'}}</p>
    </Modal>
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
        // 默认当前页
        pageNum: 1,
        // 默认每页显示条数
        pageSize: 10
      },
      // 总页数
      total: 10,
      columns7: [
        {
          title: '用户名',
          key: 'username',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.username)
            ])
          }
        },
        {
          title: '姓名',
          key: 'realName'
        },
        {
          title: '性别',
          key: 'gender'
        },
        {
          title: '学校',
          key: 'location'
        },
        {
          title: '注册时间',
          key: 'registerTime'
        },
        {
          title: '角色',
          key: 'role'
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
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '更多'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.visibleDialog = true
                    this.delUserData = params.row
                    this.index = params.index
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      userInfo: [],
      // 对话框
      visibleDialog: false,
      loading: true,
      delUserData: {},
      index: ''
    }
  },
  methods: {
    show (index) {
      // console.log(index)
      this.$Modal.info({
        title: '用户信息',
        content: `昵称：${this.userInfo[index].nickname}<br>
        个人简介：${this.userInfo[index].description}<br>
        毕业年份：${this.userInfo[index].graduationDate}<br>
        状态：${this.userInfo[index].state}
        `
      })
    },
    // 页码改变的回调，返回改变后的页码
    async PageNumChange(pageNum) {
      this.queryInfo.pageNum = pageNum
      const res = await this.$http.get('/admin/user', {
        params: this.queryInfo
      })
      this.userInfo = res.data.records
      console.log(res)
    },
    // 切换每页条数时的回调，返回切换后的每页条数
    async pageSizeChange(pageSize) {
      this.queryInfo.pageSize = pageSize
      const res = await this.$http.get('/admin/user', {
        params: this.queryInfo
      })
      this.userInfo = res.data.records
      console.log(res)
    },
    async getUser() {
      const res = await this.$http.get('/admin/user', {
        params: this.queryInfo
      })
      console.log(res)
      this.userInfo = res.data.records
      this.total = res.data.total
    },
    // 删除用户操作
    async remove(delUserData, index) {
      console.log(delUserData)
      const res = await this.$http.delete('/admin/deleteUser', {
        params: {
          username: delUserData.username
        }
      })
      console.log(res)
      if (res.status === 200) {
        // 先隐藏对话框，再提示成功
        this.visibleDialog = false
        this.$Message.success('删除用户成功！')
        // 根据删除数组中的值
        this.userInfo.splice(index, 1)
      } else {
        this.$Message.error('删除用户失败！')
      }
    },
    // 对话框，确认删除用户
    asyncOK () {
      this.remove(this.delUserData, this.index)
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style scoped>
</style>
