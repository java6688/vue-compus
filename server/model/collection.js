const mongoose = require('mongoose')
const moment = require('moment')

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  goodsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goods',
    required: true
  },
  addTime: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  }
})

// 根据规则创建集合
const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection