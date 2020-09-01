const mongoose = require('mongoose')
const moment = require('moment');

// 创建商品集合规则
const goodsSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    // 将商品与与用户集合关联
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    // minlength: 1,
    maxlength: 100,
    required: [true, '请输入商品标题']
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: Array,
    required: true
  },
  location: {
    type: String,
    require: true
  },
  uploadDate: {
    type: String,
    require: true
  },
  goodsImgs: {
    type: Array,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  uploadTime: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  // 0表示未审核，1表示审核通过
  check: {
    type: Number,
    default: 0
  },
  phone: {
    type: String,
    required: true
  },
  qq: {
    type: String
  },
  wx: {
    type: String
  }
})
// 根据规则创建集合
const Goods = mongoose.model('Goods', goodsSchema)

// 创建商品
// for(var i=0; i<100; i++) {
//   Goods.create({
//       "category": ["数码产品", "平板"],
//       "goodsImgs": ["http://localhost//upload/2020-08-10/goods-1597074916664.jpg", "http://localhost//upload/2020-08-10/goods-1597074920304.jpg", "http://localhost//upload/2020-08-10/goods-1597074922750", "http://localhost//upload/2020-08-10/goods-1597074925322.png", "http://localhost//upload/2020-08-10/goods-1597074930124.jpg"],
//       "views": 0,
//       "seller": "5f2420e61a2c651df8687a52",
//       "title": "平板 11",
//       "description": "平板平板平板平板平板平板平板平板平板平板平板平板平板！",
//       "price": 6000,
//       "location": "桂林理工大学",
//       "phone": "18378301612",
//       "qq": "1253490794",
//       "wx": "liu1253490794",
//       "check": 1
//   }).then(() => {
//     console.log('用户创建成功');
//   }).catch(() => {
//     console.log('用户创建失败');
//   })
// }
// Goods.deleteMany({goodsImgs: {$regex: '2020-08-01', $options:'i'}}).then(() => {
//     console.log('用户创建成功');
//   }).catch(() => {
//     console.log('用户创建失败');
//   })

// 将集合规则作为模块成员进行导出
module.exports = Goods
