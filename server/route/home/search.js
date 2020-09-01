const Goods = require('../../model/goods')

module.exports = async (req, res) => {
  const { keyword } = req.query
  const goodsArr = await Goods.find({title: {$regex: keyword, $options:'i'}})
  res.json(goodsArr)
}