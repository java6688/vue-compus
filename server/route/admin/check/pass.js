const Goods = require('../../../model/goods')

module.exports = async (req, res) => {
  const { check, id } = req.body
  console.log(req.body)
  Goods.updateOne({_id: id}, { check }).then(() => {
    res.json({
      msg: '审核通过'
    })
  }).catch((e) => {
    console.log(e)
    res.statusCode = 403
    res.json({
      msg: '审核失败'
    })
  })
}