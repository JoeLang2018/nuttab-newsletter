import Vue from 'vue'
import Router from 'vue-router'
import appConfig from '@/config/index'
import store from '@/store'

Vue.use(Router)

// 判断是否需要登录访问, 配置位于 config 文件夹
let isLoginRequired = routeName => {
  // 首次执行时缓存配置
  let { notLoginRoute } = appConfig
  const notLoginMark = {}

  // 构建标记对象
  if (Array.isArray(notLoginRoute)) {
    for (let i = 0; i < notLoginRoute.length; i += 1) {
      notLoginMark[notLoginRoute[i].toString()] = true
    }
  }

  notLoginRoute = null // 释放内存

  // 重写初始化函数
  isLoginRequired = name => {
    if (!name) {
      return true
    }
    // 处理 Symbol 类型
    const target = typeof name === 'symbol' ? name.description : name
    return !notLoginMark[target]
  }

  return isLoginRequired(routeName)
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // srcollBehavior(to, from, savedPosition) {

  //   if (to.hash) {
  //     console.log('to')
  //     return {
  //       selector: to.hash,
  //       behavior: 'smooth',
  //     }
  //   }
  // },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/author/:name',
      name: 'author',
      component: () => import('@/views/Author.vue'),
      children: [
      ]
    },
    {
      path: '/archive/:name',
      name: 'archive',
      component: () => import('@/views/Archive.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/views/Article.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/views/Edit.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/Dashboard.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/intro',
      name: 'intro',
      component: () => import('@/views/BeAuthor.vue'),
    },
    { path: '/404', component: () => import('@/views/404') },
    { path: '/500', component: () => import('@/views/500') },
    { path: '/502', component: () => import('@/views/502') },
    { path: '/*', component: () => import('@/views/404') }

  ],

})

router.beforeEach((to, from, next) => {
  // 登录验证
  // console.log('to', to)
  if (isLoginRequired(to.name) && !store.state.logined) {
    next({ path: '/login' })
    return
  }

  // TODO: tab 模式重复点击验证

  // 权限验证
  // if (store && store.state && store.getters) {
  //   const { permissions, user } = store.getters
  //   if (to.path !== '/about' && !Util.hasPermission(permissions, to.meta, user)) {
  //     Vue.prototype.$notify({
  //       title: '无权限',
  //       dangerouslyUseHTMLString: true,
  //       message: '<strong class="my-notify">您无此页面的权限哟</strong>',
  //     })
  //     next({ path: '/about' })
  //     return
  //   }
  // }

  // 路由发生变化重新计时
  Vue.prototype.$_lin_jump()

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

export default router