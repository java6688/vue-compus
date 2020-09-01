const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
  var filePath = path.resolve('./')  // D:\web\接口测试
  filePath = path.join(filePath, 'public', 'mock', 'category.json')
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (!error) {
      res.json(JSON.parse(data))
    } else {
      res.statusCode = 403
      res.json({
        msg: '获取分类失败！'
      })
    }
  })
}