import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import { Header, Table, LoadingBar, Layout, Content, Footer, Message, Spin, Notice, Tabs, TabPane, Sider, ListItemMeta, List, ListItem, Radio, RadioGroup, Form, FormItem, Select, Option, Cascader, Upload, Modal, Progress, Button, BackTop, Input, Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Icon, Tag, Card, Breadcrumb, BreadcrumbItem, Page } from 'view-design'
import 'view-design/dist/styles/iview.css'
import waterfall from 'vue-waterfall2'
import './assets/css/global.css'
import axios from 'axios'
import NProgress from 'nprogress'
import './assets/iconfont/iconfont.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(VueRouter)
// 后台和前台不同的组件start
Vue.component('Header', Header)
Vue.component('Table', Table)
// 后台和前台不同的组件end
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Sider', Sider)
Vue.component('ListItemMeta', ListItemMeta)
Vue.component('List', List)
Vue.component('ListItem', ListItem)
Vue.component('Radio', Radio)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Input', Input)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Cascader', Cascader)
Vue.component('Upload', Upload)
Vue.component('Modal', Modal)
Vue.component('Progress', Progress)
Vue.component('Button', Button)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Icon', Icon)
Vue.component('Tag', Tag)
Vue.component('Card', Card)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Layout', Layout)
Vue.component('Content', Content)
Vue.component('Footer', Footer)
Vue.component('Page', Page)
Vue.component('BackTop', BackTop)
Vue.use(waterfall)

// 加载进度条
router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})
router.afterEach(route => {
  LoadingBar.finish()
})

// 配置请求根路径
axios.defaults.baseURL = 'http://liuguanghai.cn/'
// 在 request 拦截器中展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在 response 拦截器中隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$Message = Message
Vue.prototype.$Spin = Spin
Vue.prototype.$Modal = Modal
Vue.prototype.$Notice = Notice

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
