<template>
  <div class="news">
    <div class="layout">
      <Header :show="activeName"></Header>
      <div class="content">
        <Card class="card">
          <div class="mytextarea">
            <WangEditor @newsInfo="refleshList"></WangEditor>
          </div>
          <h3 style="margin: 10px 0;">全部动态</h3>
          <div class="list">
            <div class="listItem" v-for="(item, i) of newsData" :key="item.id">
              <div class="user clearfix">
                <div class="avatar">
                  <img :src="item.user.avatarUrl?item.user.avatarUrl:defaultAvatar">
                </div>
                <div class="userInfo">
                  <p class="username">{{item.user.nickname?item.user.nickname:item.user.username}}</p>
                  <p class="ptime">{{item.publishTime}}</p>
                </div>
              </div>
              <div class="pcontent">
                <div class="text" v-html="item.content"></div>
                <!-- <div class="textImg">
                  <img src="https://pic.qiushibaike.com/system/pictures/12349/123499852/medium/NRU0CDUZHKGXGY9O.jpg" alt="">
                  <img src="https://pic.qiushibaike.com/system/pictures/12349/123499852/medium/NRU0CDUZHKGXGY9O.jpg" alt="">
                </div> -->
              </div>
              <!-- <div class="comment clearfix">
                  <div class="avatar">
                    <img src="https://pic.qiushibaike.com/system/pictures/12349/123499852/medium/NRU0CDUZHKGXGY9O.jpg" alt="">
                  </div>
                  <div class="userInfo">
                    <p class="username">
                      评论用户：
                      <span class="commentText">
                        评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容
                      </span>
                    </p>
                    <p class="ptime">2020-8-27 16:20:55</p>
                  </div>
              </div>
              <div class="comment clearfix">
                  <div class="avatar">
                    <img src="https://pic.qiushibaike.com/system/pictures/12349/123499852/medium/NRU0CDUZHKGXGY9O.jpg" alt="">
                  </div>
                  <div class="userInfo">
                    <p class="username">
                      评论用户：
                      <span class="commentText">
                        评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容
                      </span>
                    </p>
                    <p class="ptime">2020-8-27 16:20:55</p>
                  </div>
              </div> -->
              <!-- <div>
                <textarea name="" id="" cols="" rows=""></textarea>
                <button>发表</button>
              </div> -->
            </div>
          </div>
          <Button style="display: block;margin: 10px auto;" type="primary" @click="handleSpinCustom">点击加载更多动态</Button>
        </Card>
      </div>
      <Footer></Footer>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
const Header = ()=>import('@components/header/Header.vue')
const Footer = ()=>import('@components/Footer.vue')
const WangEditor = ()=>import('@components/news/wangEditor-3.1.1/WangEditor.vue')
// import Header from '@components/header/Header.vue'
// import Footer from '@components/Footer.vue'
// import WangEditor from '@components/news/wangEditor-3.1.1/WangEditor.vue'
export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    WangEditor
  },
  data() {
    return {
      // 控制导航栏激活状态
      activeName: '4',
      defaultAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596303462534&di=77780457c88d6f77e8d2431c0b3ed309&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F56%2F69%2F575747cfd0cfe1a.jpg',
      newsData: [],
      // 限制查询条数
      sum: 20,
      // 记录服务器返回数据长度
      newslength: 0
    }
  },
  methods: {
    async getNews(target) {
      const res = await this.$http.get('/getNews', {
        params: {
          sum: this.sum
        }
      })
      if (this.newsData.length === res.data.length && target === 'loading') {
        setTimeout(() => {
            this.$Message.warning('没有更多动态了哦！')
        }, 1000);
        return
      }
      this.newsData = res.data
      console.log(this.newsData)
      // this.newslength = this.newsData.length
    },
    refleshList(data) {
      this.getNews()
      // console.log(data)
      // this.newsData.push(data)
      // console.log(this.newsData)
    },
    handleSpinCustom () {
      this.sum += this.sum
      this.getNews('loading')
      this.$Spin.show({
          render: (h) => {
              return h('div', [
                  h('Icon', {
                      'class': 'demo-spin-icon-load',
                      props: {
                          type: 'ios-loading',
                          size: 18
                      }
                  }),
                  h('div', 'Loading')
              ])
          }
      });
      setTimeout(() => {
          this.$Spin.hide();
      }, 1000);
    },
    itemMouseover() {
      var listItem = document.getElementsByClassName('listItem')
      for (var i = 0; i < listItem.length; i++) {
        listItem[i].onmouseover = function() {
          // this.style.transform = 'translateY(5px)'
          this.style.border = '5px solid rosybrown'
        }
        listItem[i].onmouseout = function() {
          // this.style.transform = 'translateY(0)'
          this.style.border = '0'
        }
      }
    },
  },
  mounted() {
    this.getNews()
  }
}
</script>

<style lang="less" scoped>
  .card{
    padding: 0 10px;
  }
  .mytextarea{
    margin-bottom: 10px;
  }
  .content{
    width: 80%;
    margin: 20px auto;
    // height: 80vh;
    .list{
      // 瀑布流start
      // -moz-column-count:2; /* Firefox */
      // -webkit-column-count:2; /* Safari 和 Chrome */
      // column-count:2;
      // -moz-column-gap: 2em;
      // -webkit-column-gap: 2em;
      // column-gap: 2em;
      // width: 100%;
      // 瀑布流end
      .listItem{
        // &:nth-child(2n-1){
        //   margin-right: 20px;
        // }
        // 瀑布流start
        // margin-bottom: 2em;
        // -moz-page-break-inside: avoid;
        // -webkit-column-break-inside: avoid;
        // break-inside: avoid;
        // min-width: 500px;
        // 瀑布流end
        // display: inline-block;
        // display: flex;
        box-sizing: border-box;
        margin-bottom: 20px;
        // border-bottom: 1px solid gainsboro;
        background-color: rgba(0,0,0,.6);
        // background-color: rosybrown;
        padding: 10px 20px;
        border-radius: 10px;
        color: white;
        max-height: 1200px;
        overflow: hidden;
        transition: .3s;
        .user{
          // background-color: darkblue;
          .avatar{
            width: 50px;
            height: 50px;
            float: left;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .userInfo{
            float: left;
            margin-left: 10px;
            margin-top: 5px;
            .username{
              font-size: 18px;
            }
            .ptime{
              font-size: 12px;
            }
          }
        }
        .pcontent{
          // border-bottom: 2px solid gainsboro;
          padding: 10px;
          .text{
            margin: 10px 0;
          }
          .textImg{
            img{
              max-height: 300px;
            }
          }
        }
        .comment{
          margin: 10px;
          .avatar{
            width: 30px;
            height: 30px;
            float: left;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .userInfo{
            float: left;
            margin-left: 10px;
            .username{
              font-size: 16px;
              .commentText{
                font-size: 15px;
              }
            }
            .ptime{
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .demo-spin-icon-load{
          animation: ani-demo-spin 1s linear infinite;
  }
    // @keyframes ani-demo-spin {
    //     from { transform: rotate(0deg);}
    //     50%  { transform: rotate(180deg);}
    //     to   { transform: rotate(360deg);}
    // }
</style>
