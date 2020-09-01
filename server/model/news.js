const mongoose = require('mongoose')
const moment = require('moment');

// 创建商品集合规则
const newsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // 将商品与与用户集合关联
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    // minlength: 1,
    // maxlength: 100,
    required: [true, '请输入商品标题']
  },
  publishTime: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  }
})

// 根据规则创建集合
const News = mongoose.model('News', newsSchema)

// 将集合规则作为模块成员进行导出
module.exports = News
