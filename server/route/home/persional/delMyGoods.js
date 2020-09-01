const Goods = require('../../../model/goods')

module.exports = (req, res) => {
  const id = req.query.id
  Goods.deleteOne({
    _id: id
  }).then(() => {
    res.json({
      msg: '删除商品成功！'
    })
  }).catch(() => {
    res.statusCode = 500
    res.json({
      msg: '删除商品失败！'
    })
  })
}