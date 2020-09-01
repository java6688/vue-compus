const News = require('../../../model/news')

module.exports = async (req, res) => {
  const sum = req.query.sum - 0
  const newsData = await News.find().sort({_id: -1}).populate('user').limit(sum)
  res.json(newsData)
}