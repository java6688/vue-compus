const Goods = require('../../model/goods')

module.exports = (req, res) => {
  const body = req.body
  Goods.updateOne({ _id: body._id } ,body).then(()=> {
    res.json({
      msg: '商品更新成功！'
    })
  }).catch(() => {
    res.statusCode = 202
    res.json({
      msg: '商品更新失败！'
    })
  })
  // Goods.create(body).then(()=> {
  //   res.json({
  //     msg: '商品更新成功！'
  //   })
  // }).catch(() => {
  //   res.statusCode = 202
  //   res.json({
  //     msg: '商品更新失败！'
  //   })
  // })
}