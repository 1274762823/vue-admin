import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
import {getToken, getUserTempId, removeToken} from "@/utils/auth";
import store from "@/store";

const sphRequest = axios.create({
    baseURL:'/api',
    timeout:5000
})

sphRequest.interceptors.request.use(config=>{
    nprogress.start();
    config.headers.userTempId = getUserTempId();
    const token = getToken();
    if(token)
    config.headers.token = token
    return config;
})

sphRequest.interceptors.response.use(value=>{
    nprogress.done()
    // if(value.data.code === 208){
    //     removeToken();
    //     store.dispatch('user/logOutAsync');
    //     return new Promise(()=>{});
    // }if(value.data.code === 200){
    //     return value.data;
    // }
    return value.data;

})



export {
    sphRequest,
}