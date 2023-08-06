import Vue from "vue";
import App from './App.vue';
import router from  '@/router/idnex'
import store from '@/store/index'
import '@/mock'
import filters from '@/filters'

Vue.config.productionTip = false

for(let key in filters){
  Vue.filter(key,filters[key])
}
new Vue({
  el:'#app',
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render:h=>h(App)
})