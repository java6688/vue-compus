const Goods = require('../../../model/goods')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  const { pageSize, pageNum } = req.query
  const goodsArr = await pagination(Goods).find({
    check: 0
  }).page(pageNum).size(pageSize).sort({_id: -1}).populate('seller').exec()
  res.json(goodsArr)
}