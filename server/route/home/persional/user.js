const User = require('../../../model/user')

module.exports = async (req, res) => {
  if (req.query.username) {
    // get请求
    const username = req.query.username
    const user = await User.findOne({username})
    res.json(user)
  } else if(req.body) {
    const { username, nickname, realName, gender, location, graduationDate, description } = req.body
    // post请求
    await User.updateOne({username}, req.body).then(() => {
      res.json({
        msg: '个人信息更新成功！'
      })
    }).catch(() => {
      res.statusCode = 202
      res.json({
        msg: '个人信息更新失败！'
      })
    })
  }
}