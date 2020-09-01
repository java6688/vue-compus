const Goods = require('../../model/goods')

module.exports = (req, res) => {
  const id = req.query.id
  Goods.deleteOne({_id: id}).then(() => {
    res.json({
      msg: '删除商品成功！'
    })
  }).catch(() => {
    res.statusCode = 401
    res.json({
      msg: '上传商品失败！'
    })
  })
}