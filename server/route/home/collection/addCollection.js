const Collect = require('../../../model/collection')

module.exports = async (req, res) => {
  const { userId, goodsId } = req.body
  const goods = await Collect.find({goodsId, userId})
  if (goods[0]) {
    res.json({
      msg: '收藏失败，收藏已存在!'
    })
  } else {
    await Collect.create(req.body)
    console.log('没有')
    res.json({
      msg: '收藏成功!'
    })
  }
}