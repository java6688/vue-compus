const Goods = require('../../../model/goods')

module.exports = async (req, res) => {
  const { goodsId } = req.query
  const goods = await Goods.findOne({_id: goodsId}).populate('seller')
  res.json(goods)
}