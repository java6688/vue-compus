const Goods = require('../../../model/goods')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  const { pageSize, pageNum, keyword, category, rank } = req.query
  // 根据分类获取数据
  const goodsArr = await pagination(Goods).find({
    check: 1,
    category: {$regex: category, $options:'i'},
    title: {$regex: keyword, $options:'i'}
  }).page(pageNum).size(pageSize).sort({_id: rank}).populate('seller').exec()
  res.json(goodsArr)
}