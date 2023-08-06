import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

Vue.use(VueRouter);

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
            isTypeNav:'true'
        }
    }
];
export default new VueRouter({
    routes,
    mode:'history'
})