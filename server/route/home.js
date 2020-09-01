/* 首页路由模块 */
const express = require('express');
const home = express.Router();
// 解决跨域问题
const cors = require('cors')
home.use(cors());

// 注册路由
home.post('/register', require('./home/register'))
// 登录路由
home.post('/login', require('./home/login'))
// 获取个人中心用户信息
home.use('/user', require('./home/persional/user'))
// 获取我的物品路由
home.get('/myGoods', require('./home/persional/myGoods'))
// 上传商品信息路由
home.post('/uploadGoods', require('./home/uploadGoods'))
// 删除我的物品路由
home.use('/delMyGoods', require('./home/persional/delMyGoods'))
// 上传头像路由
home.post('/uploadAvatar', require('./home/persional/uploadAvatar'))
// 获取集市所有商品
home.get('/shop', require('./home/shop/shopGoods'))
// 获取上传商品分类数据
home.get('/category', require('./home/category'))
// 搜索路由
home.get('/search', require('./home/search'))
home.post('/editGoods', require('./home/editGoods'))
// 收藏商品路由
home.post('/addCollection', require('./home/collection/addCollection'))
// 获取收藏列表
home.get('/getCollection', require('./home/collection/getCollection'))
// 取消收藏
home.use('/delCollection', require('./home/collection/delCollection'))
// 获取详情页面商品
home.get('/goodsDetail', require('./home/detail/getGoods'))
// 发布动态
home.post('/publishNews', require('./home/news/publishNews'))
home.get('/getNews', require('./home/news/getNews'))
home.get('/getMyNews', require('./home/news/getMyNews'))
home.use('/delMyNews', require('./home/news/delMyNews'))

// 上传商品图片
const multer = require('multer');
const moment = require('moment');
  
var timestamp = '';
var timepath = moment().format('YYYY-MM-DD');
// 配置上传文件的存放位置
var destination = '/public/upload/' + timepath;
// var destination = path.join(__dirname, 'public', 'upload', timepath) 
var filename = '';
  
var storage = multer.diskStorage({
    //这里destination是一个字符串
    destination: '.' + destination,
    filename: function(req, file, cb) {
      
    //自定义设置文件的名字
    timestamp = new Date().getTime();
    let filenameArr = file.originalname.split('.');
    let picSuffix = filenameArr[filenameArr.length - 1];
    filename = 'goods-' + timestamp + '.' + picSuffix;
    cb(null, filename)
  }
});
var upload = multer({
    storage: storage
});
//处理来自页面的ajax请求。单文件上传upload.single('file')
//多文件上传使用upload.array('file', number)
home.post('/upload', upload.single('file'), function(req, res, next) {
    //拼接文件上传后的路径
    // var url = destination + '/' + filename;
    var imgUrl = destination.split('public')
    imgUrl = imgUrl[imgUrl.length-1] + '/' + filename;
    res.json({
        code: true,
        msg: '上传成功',
        imgUrl: imgUrl
    })
});

module.exports = home;