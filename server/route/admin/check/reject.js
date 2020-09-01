const Goods = require('../../../model/goods')

module.exports = (req, res) => {
  const id = req.query.id
  Goods.deleteOne({_id: id}).then(() => {
    res.json({
      msg: '删除成功！'
    })
  }).catch(() => {
    res.statusCode = 403
    res.json({
      msg: '删除失败！'
    })
  })
}