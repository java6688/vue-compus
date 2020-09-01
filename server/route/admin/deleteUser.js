const User = require('../../model/user')

module.exports = (req, res) => {
  const username = req.query.username
  User.deleteOne({
    username
  }).then(() => {
    res.json({
      msg: '删除用户成功！'
    })
  }).catch(() => {
    res.statusCode = 401
    res.json({
      msg: '删除用户失败！'
    })
  })
}