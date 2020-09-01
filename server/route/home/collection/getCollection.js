const Collect = require('../../../model/collection')

module.exports = async (req, res) => {
  const { userId } = req.query
  // populate嵌套使用
  const collections = await Collect.find({userId}).populate({
    path: 'goodsId',
    populate: {
      path: 'seller'
    }
  }).sort({_id:-1})
  res.json(collections)
}