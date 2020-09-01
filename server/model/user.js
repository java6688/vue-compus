/* 创建同户集合 */
// 引入mongoose第三方模块
const mongoose = require('mongoose');

// 创建用户集合规则
const userSchema = mongoose.Schema({
  avatarUrl: {
    type: String
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20
  },
  nickname: {
    type: String
  },
  realName: {
    type: String
  },
  gender: {
    type: String
  },
  location: {
    type: String
  },
  graduationDate: {
    type: String
  },
  description: {
    type: String
  },
  phone: {
    type: String
  },
  //   nickname,
  //   realName,
  //   gender,
  //   location,
  //   graduationDate,
  //   description
  // admin 超级管理员  normal 普通管理员
  role: {
    type: String,
    default: 'normal'
  },
  // 0是启用状态，1是禁用状态 
  state: {
    type: Number,
    default: 0
  }
});

// 创建集合
const User = mongoose.model('User', userSchema);

// 创建用户
// User.create({
//   username: 'lgh',
//   password: '666666',
//   role: 'admin',
//   state: '0'
// }).then(() => {
//   console.log('用户创建成功');
// }).catch(() => {
//   console.log('用户创建失败');
// })

// 将用户集合作为模块成员进行导出
module.exports = User