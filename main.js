import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';

//引入vue-resource
import VueResource from 'vue-resource';
//加载vue-resource
Vue.use(VueResource);

// import 'common/stylus/index.styl'

Vue.config.productionTip = false

//2.1:引入axios组件库(VueResource)
import axios from "axios"
//2.2:跨域保存session值
axios.defaults.withCredentials=true
//2.4:注册组件
Vue.prototype.$axios=axios
Vue.config.productionTip = false
//7.设置全局ajax post 访问格式
Vue.http.options.emulateJSON = true;
//8.跨域访问保存session值选项
Vue.http.options.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
