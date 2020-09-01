<template>
  <div class="detail">
    <Header></Header>
    <Card class="card clearfix">
      <div class="imgContainer fl">
        <div class="bigPic">
          <!-- <img id="imgControl" v-if="goodsData.goodsImgs" :src="goodsData.goodsImgs[0]" alt=""> -->
          <div class="small-box">
            <img id="imgControl" class="small-pic" v-if="goodsData.goodsImgs" :src="goodsData.goodsImgs[0]">
            <div class="mask"></div>
            <div class="rect"></div>
          </div>
          <div class="big-box">
            <div class="big-pic2"></div>
          </div>
        </div>
        <div class="smallPic">
          <img :class="i===0?'imgItem active':'imgItem'" @mouseenter="handleImg(i)" v-for="(item, i) of goodsData.goodsImgs" :src="item" :key="i">
        </div>
      </div>
      <div class="content fl">
        <div class="item-footer">
          <div
            v-if='goodsData.seller'
            class='avatar'
            :style='{backgroundImage : `url(${goodsData.seller.avatarUrl})`}'
          ></div>
          <div class='name' v-if="goodsData.seller">{{goodsData.seller.username}}</div>
        </div>
        <h2 class="title">{{goodsData.title}}</h2>
        <div class="item dec">
          {{goodsData.description}}
        </div>
        <p class="item price">
          <span class="iconfont icon-jiageprice1" style="color: #5B6270;"></span>
          ￥{{goodsData.price}}
        </p>
        <p class="item location">
          <span class="iconfont icon-xuexiao"></span>
          {{goodsData.location}}
        </p>
        <p class="item time">
          <span class="iconfont icon-shijian"></span>
          发布时间：{{goodsData.uploadTime}}
        </p>
        <div class="contact" v-if="contactShow">
          <p class="item qq">
            <span class="iconfont icon-QQ"></span>
            QQ：{{goodsData.qq}}
          </p>
          <p class="item wx">
            <span class="iconfont icon-weixin"></span>
            微信：{{goodsData.wx}}
          </p>
          <p class="item phone">
            <span class="iconfont icon-shoujihaoma"></span>
            手机号码：{{goodsData.phone}}
          </p>
        </div>
        <a class="prompt" href="/#/login" v-if="!contactShow">
          登录后才能查看卖家的联系方式哦！
        </a>
      </div>
    </Card>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/header/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'Detail',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      goodsData: {},
      imgItems: '',
      contactShow: false
    }
  },
  methods: {
    handleImg(index) {
      var bPic2 = document.getElementsByClassName('big-pic2')[0]
      bPic2.style.backgroundImage = `url(${this.goodsData.goodsImgs[index]})`
      var imgControl = document.getElementById('imgControl')
      var imgItems = document.getElementsByClassName('imgItem')
      imgControl.src = imgItems[index].src
      for (var j = 0; j < imgItems.length; j++) {
        imgItems[j].classList.remove('active')
      }
      imgItems[index].classList.add('active')
    },
    async receiveItemData() {
      // console.log(JSON.parse(sessionStorage.getItem('goodsData')))
      // this.goodsData = JSON.parse(sessionStorage.getItem('goodsData'))
      const goodsId = this.$route.query.goodsId
      const res = await this.$http.get('/goodsDetail', {
        params: {
          goodsId
        }
      })
      this.goodsData = res.data
      // 数据获取完再执行放大镜
      this.magnify()
    },
    magnify() {
      var mask = document.getElementsByClassName('small-box')[0]
      // 为什么要用mask呢？不直接用选中small-pic。
      // 如果直接选择图片标签来绑定下面的mouseover事件，图片会一直闪烁！所以我们得给他一个和图片一样大小的遮罩层
      var rect = document.getElementsByClassName('rect')[0]
      var bBox = document.getElementsByClassName('big-box')[0]
      var bPic2 = document.getElementsByClassName('big-pic2')[0]
      bPic2.style.backgroundImage = `url(${this.goodsData.goodsImgs[0]})`
      mask.addEventListener('mousemove', magnifier)
      function magnifier(e) {
        bBox.style.display = 'inline-block'
        // 方块的left top在你的鼠标的左上方（网页左上角是原点），因此是减去一个方块的一半。
        var x = e.offsetX - rect.offsetWidth / 2
        var y = e.offsetY - rect.offsetHeight / 2
        // 极端情况,也就是当你的鼠标上的方块到四个边的边缘的时候。
        if (x < 0) {
          x = 0
        }
        if (y < 0) {
          y = 0
        }
        if (x > mask.offsetWidth - rect.offsetWidth) {
          x = mask.offsetWidth - rect.offsetWidth
        }
        if (y > mask.offsetHeight - rect.offsetHeight) {
          y = mask.offsetHeight - rect.offsetHeight
        }
        // 方块定位
        rect.style.display = 'block'
        rect.style.left = x + 'px'
        rect.style.top = y + 'px'
        // 第二种方法，这里需要注意 backgroundPosition的值是从0 - 100%的（得用百分比表示）；
        // 需要注意的是何时为百分百，从上面的极端情况判定我们可以知道
        // x 是从0 到 mask.offsetWidth - rect.offsetWidth；
        // 因此这就是0 - 100%；y同理
        // bPic2.style.display = 'block'
        bPic2.style.backgroundPosition = `${x / (mask.offsetWidth - rect.offsetWidth) * 100}% ${y / (mask.offsetHeight - rect.offsetHeight) * 100}%`
      }
      mask.addEventListener('mouseout', function() {
        rect.style.display = 'none'
        // bPic2.style.display = 'none'
        bBox.style.display = 'none'
      })
    },
    getLocalStorage() {
      var username = localStorage.getItem('username')
      username ? this.contactShow = true : this.contactShow = false
    }
  },
  mounted() {
    this.receiveItemData()
    // setTimeout(this.handleImg, 100)
    // this.handleImg()
    this.getLocalStorage()
  }
}
</script>

<style lang="less" scoped>
  .detail{
    .card{
      width: 1000px;
      min-height: 530px;
      margin: 36px auto;
      padding: 20px;
      box-sizing: border-box;
    }
    background: #f5f7f9;
    .imgContainer{
      width: 350px;
      /* background: #00BFFF; */
      margin-right: 50px;
      .bigPic img{
        max-height: 100%;
        max-width: 100%;
      }
      .bigPic{
        height: 400px;
        width: 350px;
        .small-box {
          position: relative;
          display: inline-block;
          height: 100%;
          width: 100%;
        }
        .small-pic {
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          cursor: crosshair;
        }
        .rect {
          position: absolute;
          display: none;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          opacity: .5;
          background-color: seagreen;
        }
        .big-box {
          display: none;
          position: absolute;
          z-index: 1;
          margin-left: 10px;
          width: 350px;
          height:400px;
          border: 1px solid seagreen;
        }
        .big-pic2{
          width: 100%;
          height: 100%;
          background-size: 350% 400%;
          // background-image: url('http://localhost//upload/2020-08-03/goods-1596388444959.jpg');
          background-position: 0 0;
          background-repeat: no-repeat;
        }
      }
      .smallPic{
        margin-top: 15px;
        height: 100px;
        width: 100%;
        img{
          width: 60px;
          height: 60px;
        }
        .imgItem{
          margin-left: 12px;
          cursor: pointer;
        }
        .imgItem:nth-child(1){
          margin-left: 0;
        }
      }
    }
  }
  .content{
    width: 520px;
    .item-footer {
      // margin-bottom: 20px;
      position: relative;
      display: flex;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .name {
        max-width: 150px;
        margin-left: 10px;
        font-size: 14px;
        color: grey;
      }
    }
    .item{
      margin: 20px 0;
    }
    .dec{
      // max-height: 185px;
      overflow: hidden;
    }
    .price{
      color: red;
    }
  }
  .active{
    border: 2px solid deepskyblue;
  }
  .fl{
    float: left;
  }
</style>
