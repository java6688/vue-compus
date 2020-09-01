const News = require('../../../model/news')

module.exports = async (req, res) => {
  const { userId } = req.query
  const myNews = await News.find({user: userId}).sort({_id: -1})
  res.json(myNews)
}