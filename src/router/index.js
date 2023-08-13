import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import {enVueRouter} from '@/utils/enhance'
import Details from "@/pages/Details/index.vue";
import AddCartSuccess from "@/pages/AddCartSuccess/index.vue";
import Cart from "@/pages/Cart/index.vue";
import {getToken} from "@/utils/auth";
import store from "@/store";
import Trade from "@/pages/Trade/index.vue";
import Pay from "@/pages/Trade/Pay/index.vue";


Vue.use(VueRouter);

//封装跳转路由
VueRouter.prototype.goToSearch = function (query){
    console.log(this.history.current.query)
    this.push({
        path:'/search',
        query:{
            ...this.history.current.query,
            pageNo:1,
            ...query
        }
    })
}


enVueRouter('push');
enVueRouter('replace');

const routes = [
    {
        path:"/",
        component:Home,
        meta:{
            isTypeNav:'true'
        }
    },
    {
        path:"/login",
        component:Login,
        meta:{
            isHideFoot:true
        }
    },
    {
        path:"/Register",
        component:Register,
        meta:{
            isHideFoot:true
        }
    },
    {
        path:"/search",
        component:Search,
        meta:{
            isTypeNav:'true',
            isScroll:'true'
        }
    },
    {
        path:'/details/:id.html',
        component: Details,
        meta:{
            isTypeNav: 'true',
        }
    },
    {
        path:'/addCartSuccess',
        component: AddCartSuccess,
        meta:{
            isTypeNav: 'true',
        }
    },
    {
        path:'/cart',
        component: Cart,
        meta:{
            isTypeNav: 'true',
        }
    },
    {
        path:'/trade',
        component: Trade,
        meta:{
            isAuth:true
        }
    },
    {
        path:'/pay',
        component: Pay
    }
];

const router = new VueRouter({
    routes,
    mode:'history',
    scrollBehavior(to,from){
        //什么时候执行？切换路由执行
        //接收几个参数？两个,to和from
        //返回什么结果？返回一个对象，滚动条滚动的位置
        if(!to.meta.isScroll){
            return{
                x:0,
                y:0
            }
        }
    }
})

router.beforeEach(async function(to,from,next){
    //刷新页面重新获取用户信息
    if(getToken() && !store.state.user.userInfo) await store.dispatch('user/getUserInfoAsync');
    if(to.meta.isAuth){
        if(getToken()){
            next()
        }else{
            router.push({
                path:'/login',
                query:{
                    cb:to.path
                }
            })
        }
    }
    next();
})

export default router