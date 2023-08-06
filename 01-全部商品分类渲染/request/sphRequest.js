import axios from 'axios';
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

const sphRequest = axios.create({
    baseURL:'/api',
    timeout:5000
})

sphRequest.interceptors.request.use(config=>{
    nprogress.start();
    return config;
})

sphRequest.interceptors.response.use(res=>{
    nprogress.done();
    return res.data;
},err=>{
    alert(err);
    return new Promise(()=>{})
})

export default sphRequest