import Vue from 'vue'
import vuetify from './plugins/vuetify'
import './plugins/base'
import './plugins/auto-jump' //自动跳出
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const mock = true;
// if (process.env.NODE_ENV === 'development') {
if (mock) {
  require('./Mock'); //import是编译时就加载，而require是执行时才加载
}

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
