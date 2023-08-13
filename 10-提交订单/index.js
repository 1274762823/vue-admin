import Vue from "vue";
import App from './App.vue';
import router from  '@/router/index'
import store from '@/store/index'
import filters from '@/filters'
import 'element-ui/lib/theme-chalk/index.css';
import {Button, Message, Row} from 'element-ui';
import '@/assets/iconfont/iconfont.css'
import '@/mock'
import PageNation from "@/components/PageNation/index.vue";

Vue.use(Button);
Vue.use(Row);
Vue.prototype.$message = Message;
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