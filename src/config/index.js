const Config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  stagnateTime: 3600 * 1000, // 无操作停滞时间  单位ms
  openAutoJumpOut: true, // 是否开启无操作跳出
  notLoginRoute: ['login', 'signup', 'home', 'about', 'intro', 'author', 'archive', 'article'], // 无需登录即可访问的路由 name,
  sideBarLevel: 3, // 侧边栏层级限制, 3表示三级, 可设置 2 和 3
  showSidebarSearch: true, // 默认打开侧边栏搜索
  defaultRoute: '/about', // 默认打开的路由
  useFrontEndErrorMsg: false, // 默认采用后端返回异常
}

export default Config
