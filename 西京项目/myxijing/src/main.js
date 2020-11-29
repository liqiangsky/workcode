import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import SIdentify from './components/identify.vue' //注意引入路径
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/public.css'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import './assets/css/system.css'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(SIdentify) //验证码
Vue.use(VueAxios, axios)
// http://119.3.45.32:9010/swagger/index.html
// "Content-Type": "application/json;charset=UTF-8",
axios.defaults.baseURL = 'http://119.3.45.32:2304/api/'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
