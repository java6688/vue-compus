/* 首页路由模块 */
const express = require('express');
const admin = express.Router();

admin.post('/login', require('./admin/login'))
// 获取用户列表
admin.get('/user', require('./admin/user'))
// 删除用户路由
admin.use('/deleteUser', require('./admin/deleteUser'))
// 商品列表获取
admin.get('/goods', require('./admin/goods/getGoods'))
// 审核列表路由
admin.get('/check', require('./admin/check/getCheckGoods'))
// 审核不通过
admin.use('/reject', require('./admin/check/reject'))
// 审核通过
admin.use('/pass', require('./admin/check/pass'))
// 商品列表和审核列表数据删除
admin.use('/delGoods', require('./admin/delGoods'))

module.exports = admin;