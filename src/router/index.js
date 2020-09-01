import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import UploadGoods from '../views/UploadGoods.vue'
import Detail from '../views/Detail.vue'
import User from '../views/user/User.vue'
import Login from '../views/Login.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminHome from '../views/admin/AdminHome.vue'
import AdminUser from '../views/admin/AdminUser.vue'
import AdminGoods from '../views/admin/AdminGoods.vue'
import AdminCheck from '../views/admin/AdminCheck.vue'
import AdminFeedback from '../views/admin/AdminFeedback.vue'
import GoodsEdit from '../views/GoodsEdit.vue'
import News from '../views/News.vue'
import UserGoods from '../views/user/UserGoods.vue'
import UserCollections from '../views/user/UserCollections.vue'
import UserNews from '../views/user/UserNews.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/home' },
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/upload_goods', component: UploadGoods },
  { path: '/detail', component: Detail },
  {
    path: '/user',
    component: User
  },
  {
    path: '/mygoods',
    component: UserGoods
  },
  { path: '/goods_edit', component: GoodsEdit },
  { path: '/mycollections', component: UserCollections },
  { path: '/mynews', component: UserNews },
  { path: '/login', component: Login },
  { path: '/news', component: News },
  {
    path: '/admin/login',
    component: AdminLogin
  },
  {
    path: '/admin/home',
    component: AdminHome,
    meta: { requireAuth: true }
  },
  {
    path: '/admin/user',
    component: AdminUser,
    meta: { requireAuth: true }
  },
  {
    path: '/admin/goods',
    component: AdminGoods,
    meta: { requireAuth: true }
  },
  {
    path: '/admin/check',
    component: AdminCheck,
    meta: { requireAuth: true }
  },
  {
    path: '/admin/feedback',
    component: AdminFeedback,
    meta: { requireAuth: true }
  }
  // ,
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 解决重复点击路由就出现这个报错了
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// 路由拦截，判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 后台拦截
    // 判断是否是管理员
    if (sessionStorage.getItem('role') === 'admin') {
      // 是，放行
      next()
    } else {
      // 不是管理员，则跳转到登录界面
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
