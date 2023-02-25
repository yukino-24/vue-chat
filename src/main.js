import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// 引用路由器
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router,

  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
