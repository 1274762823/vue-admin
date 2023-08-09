import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

const filmRequest = axios.create({
    baseURL:'https://m.maizuo.com',
    timeout:5000
})

filmRequest.interceptors.request.use(config=>{
    nprogress.start();
    return config;
})

filmRequest.interceptors.response.use(value=>{
    nprogress.done();
    return value.data;
})

export  {
    filmRequest
}