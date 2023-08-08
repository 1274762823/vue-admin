import Vue from "vue";
import App from './App.vue';
import router from  '@/router/idnex'
import store from '@/store/index'
import '@/mock'
import filters from '@/filters'
import '@/assets/iconfont/iconfont.css'
import PageNation from "@/components/PageNation/index.vue";


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
    Vue.component('PageNation',PageNation)
  },
  render:h=>h(App)
})