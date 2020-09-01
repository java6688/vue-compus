const News = require('../../../model/news')

module.exports = (req, res) => {
  const { id } = req.query
  const myNews = News.deleteOne({_id: id}).then(() => {
    res.json({
      msg: '删除成功！'
    })
  }).catch(() => {
    res.statusCode = 201
    res.json({
      msg: '删除失败！'
    })
  })
}