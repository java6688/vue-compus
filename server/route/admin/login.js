const User = require('../../model/user')

module.exports = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({username})
  if (user && password === user.password) {
    // 验证密码成功
    // req.session.username = user.username
    // req.session.role = user.role
    res.json({
      msg: '密码验证通过',
      username: user.username,
      role: user.role,
      status: 200
    })
  } else {
    res.statusCode = 202
    // res.send('验证不通过！')
    res.json({
      msg: '密码验证不通过',
      status: 202
    })
  }
  res.end()
}