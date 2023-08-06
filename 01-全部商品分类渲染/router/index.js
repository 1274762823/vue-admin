import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
Vue.use(VueRouter);

const nativePush = Vue.prototype.push;
Vue.prototype.push = function(location, onComplete, onAbort){
    return nativePush(location,onComplete,()=>{})
};

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
		component:Login
	},
	{
		path:"/Register",
		component:Register
	},
	{
		path:"/search",
		component:Search,
		meta:{
			isTypeNav:'true'
		}
	}
];
const router = new VueRouter({
	mode:"history",
	routes
});
export default router;