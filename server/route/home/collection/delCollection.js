const Collect = require('../../../model/collection')

module.exports = (req, res) => {
  const { goodsId } = req.query
  Collect.deleteOne({goodsId}).then(() => {
    res.json({
      msg: '删除成功！'
    })
  }).catch(() => {
    res.statusCode = 202
    res.json({
      msg: '删除失败！'
    })
  })
}