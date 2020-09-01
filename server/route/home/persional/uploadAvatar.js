const User = require('../../../model/user')

module.exports = (req, res) => {
  const { avatarUrl, username } = req.body
  User.updateOne({username} ,{avatarUrl}).then(() => {
    res.json({
      msg: '更新头像成功！'
    })
  }).catch(() => {
    res.statusCode === 500
    res.json({
      msg: '更新头像失败！'
    })
  })
}