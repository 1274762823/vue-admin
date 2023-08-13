import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const focusRequest = axios.create({
    baseURL:'http://mock.com',
    timeout:5000
})

focusRequest.interceptors.request.use(config=>{
    nprogress.start();
    return config;
})

focusRequest.interceptors.response.use(value=>{
    nprogress.done();
    return value.data;
})

export {focusRequest}
// import axios from 'axios';
// import nprogress from "nprogress";
// import "nprogress/nprogress.css";
// const focusRequest = axios.create({
//     baseURL:"http://mock.com",
//     timeout:5000
// });
// // 请求拦截
// focusRequest.interceptors.request.use(config=>{
//     nprogress.start();// 开启进度条
//     return config;
// });
// // 响应拦截
// focusRequest.interceptors.response.use(response=>{
//     nprogress.done();// 结束进度条
//     return response.data;// 返回响应体
// },(err)=>{
//     nprogress.done();// 结束进度条
//     alert(err);
//     return new Promise(()=>{});// 返回一个状态为pending的Promise痊
// });
// // export default mockRequest;
// export {
//     focusRequest
// }