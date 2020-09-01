const User = require('../../model/user')
const pagination = require('mongoose-sex-page')

module.exports = async(req, res) => {
  console.log(req.query)
  const { pageSize, pageNum } = req.query
  const users = await pagination(User).find().page(pageNum).size(pageSize).exec()  // .display(3)显示多少个页码
  res.json(users)
}