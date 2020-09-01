const User = require('../../model/user')

module.exports = async (req, res) => {
  const { username, password } = req.body
  const users = await User.findOne({username})
  if (!users) {
    // 用户不存在，创建用户
    User.create({
      username,
      password
    }).then(() => {
      res.json({
        msg: '用户创建成功！'
      })
    }).catch(() => {
      res.statusCode = 201
      res.json({
        msg: '用户创建失败！'
      })
    })
  } else {
    // 用户存在
    res.statusCode = 202
    res.json({
      msg: '用户名已存在！'
    })
  }
}