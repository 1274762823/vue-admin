import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
import {getUserTempId} from "@/utils/auth";

const sphRequest = axios.create({
    baseURL:'/api',
    timeout:5000
})

sphRequest.interceptors.request.use(config=>{
    nprogress.start();
    config.headers.userTempId = getUserTempId();
    return config;
})

sphRequest.interceptors.response.use(value=>{
    nprogress.done()
    return value.data;
})



export {
    sphRequest,
}