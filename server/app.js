const express = require('express');
const path = require('path')
const admin = require('./route/admin')
const home = require('./route/home')
const bodyParser = require('body-parser');
const session = require('express-session')

// 创建网站服务器
const app = express();
// 连接数据库
require('./model/connect')
// require('./model/collect')
// const moment = require('moment')
// console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
// console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
// console.log(moment().format('dddd'))
// console.log(moment().format("MMM Do YY"))
// console.log(moment().format('YYYY [escaped] YYYY'))
// console.log(moment().format('YYYY-MM-DD hh:mm:ss'))
// console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
// console.log(moment().format())

app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

// saveUninitialized: 退出登录是否保存初始cookie
app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  cookie: {
    // 把一小时转换成毫秒
    maxAge: 60*60*1000
  }
}))

app.use(home);
app.use('/admin', admin);

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));


app.listen(80);
console.log('http://localhost')