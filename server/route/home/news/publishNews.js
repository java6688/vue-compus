const News = require('../../../model/news')

module.exports = (req, res) => {
  const newsData = req.body
  News.create(newsData).then(() => {
    res.json({
      msg: '发布成功！'
    })
  }).catch(() => {
    res.statusCode = 201
    res.json({
      msg: '发布失败！'
    })
  })
}