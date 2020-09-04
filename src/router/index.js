import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/home' },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@views/Home.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '@views/Shop.vue')
  },
  {
    path: '/upload_goods',
    name: 'UploadGoods',
    component: () => import(/* webpackChunkName: "upload_goods" */ '@views/UploadGoods.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "news" */ '@views/News.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '@views/user/User.vue')
  },
  // {
  //   path: '/user',
  //   name: 'User',
  //   component: () => import(/* webpackChunkName: "user" */ '@views/user/User2.vue'),
  //   redirect: '/user/info',
  //   children: [
  //     {
  //       path: '/user/info',
  //       component: () => import(/* webpackChunkName: "user" */ '@components/user/UserInfo2.vue')
  //     },
  //     {
  //       path: '/user/mygoods',
  //       component: () => import(/* webpackChunkName: "user" */ '@components/user/MyGoods2.vue')
  //     },
  //   ]
  // },
  {
    path: '/mygoods',
    name: 'UserGoods',
    component: () => import(/* webpackChunkName: "user" */ '@views/user/UserGoods.vue')
  },
  {
    path: '/goods_edit',
    name: 'GoodsEdit',
    component: () => import(/* webpackChunkName: "user" */ '@views/GoodsEdit.vue')
  },
  {
    path: '/mycollections',
    name: 'UserCollections',
    component: () => import(/* webpackChunkName: "user" */ '@views/user/UserCollections.vue')
  },
  {
    path: '/mynews',
    name: 'UserNews',
    component: () => import(/* webpackChunkName: "user" */ '@views/user/UserNews.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ '@views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@views/Login.vue')
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "admin_login" */ '@views/admin/AdminLogin.vue')
  },
  {
    path: '/admin/home',
    name: 'AdminHome',
    component: () => import(/* webpackChunkName: "admin_home" */ '@views/admin/AdminHome.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/admin/user',
    name: 'AdminUser',
    component: () => import(/* webpackChunkName: "admin_user" */ '@views/admin/AdminUser.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/admin/goods',
    name: 'AdminGoods',
    component: () => import(/* webpackChunkName: "admin_goods" */ '@views/admin/AdminGoods.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/admin/check',
    name: 'AdminCheck',
    component: () => import(/* webpackChunkName: "admin_check" */ '@views/admin/AdminCheck.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/admin/feedback',
    name: 'AdminFeedback',
    component: () => import(/* webpackChunkName: "admin_feedback" */ '@views/admin/AdminFeedback.vue'),
    meta: { requireAuth: true }
  }
  // ,
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@views/About.vue')
  // }
]

const router = new VueRouter({
  // 去除地址栏#，但有个坑（需要合理配置服务器，不然找不到路由）
  mode: 'history',
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
