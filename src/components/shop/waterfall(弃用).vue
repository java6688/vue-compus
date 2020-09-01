<template>
  <div class='container-water-fall'>
    <!-- <h1 style='position: fixed;left: 0;top: 100px;font-style: 15px;color:blue;z-index: 1000;'>{{loadstatus}}</h1> -->
<!--    <div class='btn-group'>
      <button @click='loadmore'>LoadMore</button>
      <button @click='switchCol(5)'>5column(列)</button>
      <button @click='switchCol(8)'>8column(列)</button>
      <button @click='switchCol(10)'>10column(列)</button>
      <button @click='reset'>reset(重置)</button>
    </div> -->
     <!-- @loadmore='loadmore'到底自动加载事件 -->
    <waterfall :col='col' :width='itemWidth' :gutterWidth='gutterWidth' :data='data'
      @scroll='scroll'
    >
      <template>
        <div class='cell-item' v-for='(item,index) in data' :key='index'>
          <router-link :to="{path: '/detail',query: {goodsId: item._id}}" target="_blank">
            <img v-if='item.goodsImgs' :src='item.goodsImgs[0]'>
          </router-link>
          <div class='item-body'>
            <router-link :to="{path: '/detail',query: {goodsId: item._id}}" target="_blank">
              <div class='item-desc' v-html="item.title"></div>
            </router-link>
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
                <span class="fl">发布于：{{item.uploadTime}}</span>
                <!-- <span class="fr like-total">{{item.views}}</span> -->
              </div>
              <div class="clearfix">
                <span class="price fl">￥150</span>
                <span class="location fr">桂林理工大学</span>
              </div>
              <div class="clearfix">
                <span class="collection fr iconfont icon-shoucang" @click="switchIcon(item._id, $event)" title="收藏"></span>
                <!-- <span class="collection fr iconfont icon-icon3" @click="switchIcon"></span> -->
              </div>
            </div>
          </div>
        </div>
      </template>
    </waterfall>
    <!-- <Button class="loadingBtn" shape="circle" @click.native="loadmore">点击显示更多</Button> -->
    <!-- <p style="margin-left: 38.5%;margin-top: 20px;">到底啦！没有更多数据咯</p> -->
    <loading :show='loading'/>
  </div>
</template>

<script>
/*
  注意:
  1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
  2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
*/
import loading from './loading'
export default {
  props: [
    'goodsData',
    'category',
    'skipNum',
    'rankSort'
  ],
  components: {
    loading
  },
  data() {
    return {
      // 懒加载次数
      loadingNum: 1,
      // 商品数据
      data: [],
      col: 5,
      loading: false,
      queryInfo: {
        // 一次读取数据数量，默认一次读取15条,跳过的数量等于data.length
        limitNum: 30,
        // 跳过条数
        skipNum: 0,
        category: '',
        keyword: '',
        rankSort: -1
      }
    }
  },
  methods: {
    reset() {
      this.data = []
    },
    switchCol(col) {
      this.col = col
    },
    async loadmore() {
      console.log('到底部了')
      // 当前数据库所有数据小于跳过数量，说明数据库已经没有更多数据了，不必在执行查询
      if (this.data.length < this.queryInfo.skipNum) {
        this.$Message.info('没有更多数据了哦！')
        return
      }
      const res = await this.$http.get('/shop', {
        params: this.queryInfo
      })
      this.$Loading.finish()
      this.data = this.data.concat(res.data)
      // 目前有多少数据就跳过多少条查询
      this.queryInfo.skipNum = this.data.length
    },
    // 滚动触发
    scroll() {
      var h = document.documentElement.scrollTop
      if (h > this.loadingNum * 200) {
        this.loadingNum = this.loadingNum + 1
        this.loadmore()
        // 新加载的添加绑定事件
        this.itemMouseover()
      }
      // console.log(h)
      // console.log(this.loadingNum)
    },
    async getData() {
      console.log(this.queryInfo)
      this.queryInfo.skipNum = 0
      this.queryInfo.category = ''
      const res = await this.$http.get('/shop', {
        params: this.queryInfo
      })
      console.log(res.data)
      this.data = res.data
      // 记录第一次获取到多少数据，防止重复查询
      this.queryInfo.skipNum = this.data.length
      console.log(this.data)
    },
    // sendGoodsData(item) {
    //   sessionStorage.setItem('goodsData', JSON.stringify(item))
    // },
    async switchIcon(goodsId, event) {
      // console.log(goodsId)
      // console.log(event.target)
      const userId = localStorage.getItem('userId')
      console.log(userId)
      // var collection = document.getElementsByClassName('collection')
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
    }
  },
  computed: {
    itemWidth() {
      return 133 * 0.5 * (document.documentElement.clientWidth / 375)
    },
    gutterWidth() {
      return 2.5 * 0.5 * (document.documentElement.clientWidth / 375)
    }
  },
  mounted() {
    if (this.$route.query.keyword) {
      this.queryInfo.keyword = this.$route.query.keyword
    }
    this.getData()
    setTimeout(this.itemMouseover, 1000)
  },
  watch: {
    // 监听父组件传递过来的分类数据变化
    goodsData: function(newVal, oldVal) {
      this.data = newVal
    },
    // 监听查询条件的变化
    category: function(newVal, oldVal) {
      this.queryInfo.category = newVal
    },
    // 监听父组件传递过来数据的数量
    skipNum: function(newVal, oldVal) {
      this.queryInfo.skipNum = newVal
    },
    rankSort: function(newVal, oldVal) {
      this.queryInfo.rankSort = newVal
      this.getData()
      console.log('执行了')
    },
    // 监听地址栏变化
    $route(to, from) {
      this.queryInfo.keyword = to.query.keyword
      this.getData()
      console.log(this.queryInfo)
      console.log(to.query.keyword)
    }
  }
}
</script>
<style  lang='less' scoped>
  .collection{
    cursor: pointer;
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
.info .fl{
  float: left;
}
.info .fr{
  float: right;
}
.info .price{
  color: red;
}
* {
  margin: 0;
}
.container-water-fall {
  width: 100vw;
  /* min-height: 47vh; */
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
          background-size: contain;
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
