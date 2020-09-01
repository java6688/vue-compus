const User = require('../../model/user')

module.exports = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({username})
  // 验证用户是否存在
  if (user) {
    // 用户存在，验证密码是否正确
    if (user.password === password) {
      res.json({
        msg: '密码验证成功！',
        id: user._id,
        username: user.username,
        avatarUrl: user.avatarUrl
      })
      return
    } else {
      res.statusCode = 202
      res.json({
        msg: '密码输入错误！'
      })
      return
    }
  } else {
  // 用户不存在
    res.statusCode = 201
    res.json({
      msg: '用户不存在！'
    })
  }
}