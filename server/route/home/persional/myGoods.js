const Goods = require('../../../model/goods')

module.exports = async (req, res) => {
  const userId = req.query.userId
  const goodsArr = await Goods.find({
    seller: userId
  }).sort({_id: -1})
  // const goodsArr = await Goods.find({seller: userId}).populate('seller')
  res.json(goodsArr)
}