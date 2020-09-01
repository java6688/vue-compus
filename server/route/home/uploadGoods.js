const Goods = require('../../model/goods')

module.exports = (req, res) => {
  const body = req.body
  Goods.create(body).then(()=> {
    res.json({
      msg: '商品上传成功！'
    })
  }).catch(() => {
    res.statusCode = 202
    res.json({
      msg: '商品上传失败！'
    })
  })
}