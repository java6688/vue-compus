<template>
  <div class="goods">
    <div class="cardLis">
      <div class="goodsCate">
        <!-- <Tag color="default">选择分类：</Tag> -->
        <div v-for="(item, i) of categories" :key="i">
          <Tag class="cateOne tag" @click.native="handleCate(item.value)" color="success">
            {{item.label}}
          </Tag>
          <Tag class="cateTwo tag" @click.native="handleCate(item2.value)" v-for="(item2, i) of item.children" :key="i">
            {{item2.label}}
          </Tag>
        </div>
      </div>
      <div class="rank">
        <a @click.prevent="switchSort($event)" class="default active">
          时间排序
          <span class="iconfont icon-paixu-xia" style="font-size: 12px;color: grey;"></span>
        </a>
        <!-- <a href="javascript:;" class="clicks">
          浏览量
          <span class="iconfont icon-paixu-xia" style="font-size: 12px;color: grey;"></span>
         </a> -->
        <!-- <a @click.prevent="priceSort($event)" class="price">
          价格
          <span class="iconfont icon-paixu-xia" style="font-size: 12px;color: grey;"></span>
        </a> -->
      </div>
    </div>
    <div class='container-water-fall'>
         <!-- @loadmore='loadmore'到底自动加载事件 -->
        <waterfall :col='col' :width='itemWidth' :gutterWidth='gutterWidth' :data='goodsData'
        >
          <template>
            <div class='cell-item' v-for='(item,index) in goodsData' :key='index' @mouseover="itemMouseover">
              <router-link class="goodsCon" :to="'/detail/' + item._id" target="_blank">
                <img v-if='item.goodsImgs.length' v-lazy='item.goodsImgs[0]' alt="图片加载中...">
                <div class='item-body'>
                  <div class='item-desc' v-html="item.title"></div>
                  <div class='item-footer'>
                    <div
                      v-if='item.seller.avatarUrl'
                      class='avatar'
                      :style='{backgroundImage : `url(${item.seller.avatarUrl})`}'
                    ></div>
                    <div class='name'>{{item.seller.username}}</div>
                    <!-- <div class='like' :class="item.liked?'active':''">
                      <i></i>
                      <div class='like-total'>{{item.like}}</div>
                    </div> -->
                  </div>
                  <div class="info">
                    <div class="clearfix">
                      <span class="fl">发布于：{{item.uploadTime.split(' ')[0]}}</span>
                      <!-- <span class="fr like-total">{{item.views}}</span> -->
                    </div>
                    <div class="clearfix">
                      <span class="price fl">￥{{item.price}}</span>
                      <span class="location fr">{{item.location}}</span>
                    </div>
                  </div>
                  
                </div>
              </router-link>
              <div class="clearfix">
                <span class="collection fr iconfont icon-shoucang"
                 @click="switchIcon(item._id, $event)" title="收藏"
                 :data-id="item._id"
                >
                </span>
                <!-- <span class="collection fr iconfont icon-icon3" @click="switchIcon"></span> -->
              </div>
            </div>
          </template>
        </waterfall>
        <Tag v-if="!goodsData[0]" color="default" style="margin-left: 45%;margin-top: 50px;font-size: 14px;">
           没有找到该数据哦!
        </Tag>
        <div class="pagination" v-if="goodsData[0]">
          <Page :total="total" show-elevator show-sizer show-total
            :current="queryInfo.pageNum"
            :page-size="queryInfo.pageSize"
            :page-size-opts="[20, 50, 80, 100]"
            @on-change="PageNumChange"
            @on-page-size-change="pageSizeChange"
          />
        </div>
      </div>
    <Loading :show='loading'></Loading>
  </div>
</template>

<script>
import Loading from './loading'
export default {
  name: 'Goods',
  components: {
    Loading
  },
  data() {
    return {
      // 商品分类
      categories: [],
      // 保存获取到的商品数据
      goodsData: [],
      col: 5,
      // 显示加载控制
      loading: false,
      // 查询条件
      queryInfo: {
        keyword: '',
        category: '',
        // 默认按降序排列-1，（1为升序）
        rank: -1,
        // 当前页
        pageNum: 1,
        // 每页显示条数
        pageSize: 50
      },
      // 总的数据条数
      total: 10,
      // 保存我的收藏数据
      collections: [],
      // 保存所有请求数据
      allGoodsData: []
    }
  },
  methods: {
    // 页码改变的回调，返回改变后的页码
    async PageNumChange(pageNum) {
      this.queryInfo.pageNum = pageNum
      const res = await this.$http.get('/shop', {
        params: this.queryInfo
      })
      this.goodsData = res.data.records
      console.log(res)
    },
    // 切换每页条数时的回调，返回切换后的每页条数
    async pageSizeChange(pageSize) {
      this.queryInfo.pageSize = pageSize
      const res = await this.$http.get('/shop', {
        params: this.queryInfo
      })
      this.goodsData = res.data.records
      console.log(res)
    },
    async getData() {
      const res = await this.$http.get('/shop', {
        params: this.queryInfo
      })
      this.goodsData = res.data.records
      this.total = res.data.total
      // 搜索完清空关键词
      // this.queryInfo.keyword = ''
    },
    // 排序高低切换(时间排序)
    switchSort(event) {
      console.log(event.target.children)
      console.log(event.target.children[0])
      if (event.target.children[0].className.indexOf('icon-paixu-shang') !== -1) {
        event.target.children[0].classList.remove('icon-paixu-shang')
        event.target.children[0].classList.add('icon-paixu-xia')
        this.queryInfo.rank = -1
        this.getData()
      } else {
        event.target.children[0].classList.remove('icon-paixu-xia')
        event.target.children[0].classList.add('icon-paixu-shang')
        this.queryInfo.rank = 1
        this.getData()
      }
      // var iconfont = document.getElementsByClassName('iconfont')[0]
      // if (iconfont.classList[1] === 'icon-paixu-shang') {
      //   iconfont.classList.remove('icon-paixu-shang')
      //   iconfont.classList.add('icon-paixu-xia')
      //   this.queryInfo.rank = -1
      //   this.getData()
      //   console.log(this.queryInfo.rankSort)
      // } else {
      //   iconfont.classList.remove('icon-paixu-xia')
      //   iconfont.classList.add('icon-paixu-shang')
      //   this.queryInfo.rank = 1
      //   this.getData()
      //   console.log(this.queryInfo.rankSort)
      // }
    },
    // async priceSort(event) {
    //   if (!this.allGoodsData[0]) {
    //     const res = await this.$http.get('/priceSort')
    //     this.allGoodsData = res.data
    //   }
    //   if (event.target.children[0].className.indexOf('icon-paixu-shang') !== -1) {
    //     console.log('aa')
    //     this.goodsData = this.goodsData.reverse()
    //     event.target.children[0].classList.remove('icon-paixu-shang')
    //     event.target.children[0].classList.add('icon-paixu-xia')
    //   } else {
    //     console.log('bb')
    //     console.log(this.allGoodsData)
    //     this.goodsData = this.allGoodsData.sort(this.compare('price'))
    //     event.target.children[0].classList.remove('icon-paixu-xia')
    //     event.target.children[0].classList.add('icon-paixu-shang')
    //   }
    // },
    // 切换active类的方法
    switchActive() {
      var rankBtns = document.querySelectorAll('.rank a')
      for (let i = 0; i < rankBtns.length; i++) {
        rankBtns[i].onclick = function() {
          for (let j = 0; j < rankBtns.length; j++) {
            rankBtns[j].classList.remove('active')
          }
          this.classList.add('active')
        }
      }
    },
    // 获取分类标签
    async getCategory() {
      const res = await this.$http.get('/category')
      this.categories = res.data
    },
    // 根据分类查找数据
    async handleCate(category) {
      // 根据分类搜索前先清空搜索框关键词
      this.queryInfo.keyword = ''
      // 选择其他分类后，重置跳过数量
      if (category === this.queryInfo.category) {
        // 等于的话不执行下面语句，禁止重复点击
        return
      }
      this.queryInfo.category = category
      // this.queryInfo.skipNum = this.goodsData.length
      const res = await this.$http.get('/shop', {
        params: this.queryInfo
      })
      // 加载再显示
      this.loading = true
      setTimeout(() => {
        if (res.status === 200) {
          // this.$emit('goods-data', res.data)
          this.goodsData = res.data.records
          this.total = res.data.total
          console.log(res)
          // 把当前分类传递给父组件的面包屑导航
          this.$emit('current-cate', category)
          this.$Message.success('获取商品数据成功！')
        } else {
          this.$Message.error('获取商品数据失败，请刷新再试！')
        }
        this.loading = false
      }, 600)
    },
    // waterfall
    reset() {
      this.data = []
    },
    switchCol(col) {
      this.col = col
    },
    async switchIcon(goodsId, event) {
      const userId = localStorage.getItem('userId')
      if (event.target.classList[event.target.classList.length - 1] === 'icon-shoucang') {
        await this.$http.post('/addCollection', {
          goodsId,
          userId
        }).then(() => {
          event.target.classList.remove('icon-shoucang')
          event.target.classList.add('icon-icon3')
          this.$Message.success('收藏成功！')
        }).catch(() => {
          this.$Message.error('收藏失败！')
        })
      } else {
        const res = await this.$http.delete('/delCollection', {
          params: {
            goodsId
          }
        })
        if (res.status === 200) {
          event.target.classList.remove('icon-icon3')
          event.target.classList.add('icon-shoucang')
          this.$Message.success('已取消收藏！')
        } else {
          this.$Message.error('取消收藏失败！')
        }
      }
    },
    itemMouseover() {
      var cellItem = document.getElementsByClassName('cell-item')
      for (var i = 0; i < cellItem.length; i++) {
        cellItem[i].onmouseover = function() {
          this.style.transform = 'translateY(-5px)'
          this.style.boxShadow = '5px 5px 10px'
        }
        cellItem[i].onmouseout = function() {
          this.style.transform = 'translateY(0)'
          this.style.boxShadow = '0 0 0'
        }
      }
    },
    async getCollection() {
      const res = await this.$http.get('getCollection', {
        params: {
          userId: localStorage.userId
        }
      })
      this.collections = res.data
    },
    // 处理收藏了的商品切换收藏到图标
    handleCollection() {
      var items = document.getElementsByClassName('collection')
      // console.log(items)
      for (var i = 0; i < items.length; i++) {
        // console.log(items[i].dataset.id)
        // console.log(this.collections)
        for (var j = 0; j < this.collections.length; j++) {
          if (items[i].dataset.id === this.collections[j].goodsId._id) {
            // items[i].className = 'collection fr iconfont icon-icon3'
            items[i].classList.remove('icon-shoucang')
            items[i].classList.add('icon-icon3')
          }
        }
      }
    },
    // 按价格排序方法
    compare(price){
      return function(a,b){
        var value1 = a[price];
        var value2 = b[price];
        return value1 - value2;
      }
    },
    // 移动端方法
    mobileScreen() {
      var w = document.documentElement.clientWidth
      if (w < 1000) {
        this.col = 4
      }
    }
  },
  watch: {
    // 监听地址栏变化
    $route(to, from) {
      // if (to.query.keyword && this.queryInfo.keyword === to.query.keyword) {
      //   this.$Message.info(`搜索"${to.query.keyword}"成功!`)
      //   return
      // }
      this.queryInfo.keyword = to.query.keyword
      // 关键词搜索时去掉分类
      this.queryInfo.category = ''
      this.getData()
      console.log(this.queryInfo)
      console.log(to.query.keyword)
    }
  },
  created() {
    this.getCategory()
    this.getData()
    this.getCollection()
  },
  mounted() {
    this.switchActive()
    // waterfall
    if (this.$route.query.keyword) {
      this.queryInfo.keyword = this.$route.query.keyword
    }
    this.itemMouseover()
    setTimeout(this.handleCollection, 1000)
    // 移动端方法
    this.mobileScreen()
  },
  computed: {
    itemWidth() {
      // 移动端方法
      var w = document.documentElement.clientWidth
      if (w < 1000) {
        return 208
      }
      return 133 * 0.5 * (document.documentElement.clientWidth / 375)
    },
    gutterWidth() {
      return 2.5 * 0.4 * (document.documentElement.clientWidth / 375)
    }
  }
}
</script>

<style lang="less" scoped>
  .clearfix:after{
    display: block;
    content: '';
    clear: both;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .goodsCon{
    color: gray;
  }
  // 分页样式
  .pagination{
    display: flex;
    justify-content: center;
  }
  .goodsCate a{
    display: inline-block;
    margin: 0 5px;
  }
  /* tag标签默认样式 */
  .goodsCate .ivu-tag-text{
    font-size: 15px;
  }
  .rank{
    background-color: #F5F7F9;
    border: 1px solid gainsboro;
    height: 50px;
    line-height: 48px;
    margin: 10px 0 20px 0;
  }
  .cardLis .rank a{
    display: inline-block;
    color: #6d6d6d;
    width: 85px;
    text-align: center;
    border-right: 1px solid gainsboro;
  }
  .cardLis .rank a.active{
    // color: #2d8cf0;
    background-color: white;
  }
  .cardLis .rank a:hover{
    // color: #2d8cf0;
    background: white;
  }
  .tag{
    cursor: pointer;
    margin-left: 5px;
    margin-bottom: 5px;
  }
  // Waterfall
  .collection{
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .clearfix:after{
    display: block;
    content: '';
    clear: both;
  }
  .menuPic{
    width: 100%;
  }
  .info{
    margin-top: 10px;
  }
  .info .price{
    color: red;
  }
  * {
    margin: 0;
  }
  .container-water-fall {
    // width: 100vw;
    width: 100%;
    min-height: 20vh;
    box-sizing: border-box;
    .loadingBtn{
      /* position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%); */
      margin-left: 40%;
      margin-top: 10px;
    }
    h4 {
      padding-top: 56px;
      padding-bottom: 28px;
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #000000;
      letter-spacing: 1px;
      text-align: justify;
    }
    /* button {
      background-color: #ff0;
      color: #24292e;
      border: 1px solid rgba(27, 31, 35, 0.2);
      border-radius: 0.25em;
      width: 100px;
      line-height: 26px;
      font-size: 13px;
      margin: 4px 0;
      margin-right: 4px;
      cursor: pointer;
      outline: none;
      &.blue-light {
        background: #27fbc2;
      }
    } */
    /* button:hover {
      background-image: linear-gradient(-180deg, #fafbfc, #ccc 90%);
    } */
    .cell-item {
      width: 100%;
      margin-bottom: 10px;
      background: #ffffff;
      border: 1px solid #F0F0F0;
      /* box-shadow: 5px 5px 10px; */
      border-radius: 10px;
      overflow: hidden;
      box-sizing: border-box;
      transition: .3s;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
      .item-body {
        padding: 12px;
        .item-desc {
          font-size: 15px;
          color: #333333;
          line-height: 15px;
          font-weight: bold;
        }
        .item-footer {
          margin-top: 22px;
          position: relative;
          display: flex;
          align-items: center;
          .avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .name {
            max-width: 150px;
            margin-left: 10px;
            font-size: 14px;
            color: #999999;
          }
          .like {
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;
            &.active {
              i {
              }
              .like-total {
                color: #FF4479;
              }
            }
            i {
              width: 28px;
              display: block;
            }
            .like-total {
              margin-left: 10px;
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }
    }
  }
  .githubdata {
    float: right;
    margin-right: 90px;
    img {
      width: 14px;
      // height: 16px;
    }
  }
</style>
