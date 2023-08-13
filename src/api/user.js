import {sphRequest} from "@/request";

// /user/passport/register
//注册
export const register =body=> sphRequest.post(`/user/passport/register`,body)

//获取验证码
//     /user/passport/sendCode/{phone}
export const sendCode = phone=> sphRequest.get(`/user/passport/sendCode/${phone}`)

//登录
export const loginPost = body=>sphRequest.post('/user/passport/login',body)

//根据token获取用户信息
export const getUserInfo = ()=>sphRequest.get('/user/passport/auth/getUserInfo')

//退出登录 /user/passport/logout
export const logOut = ()=>sphRequest.get('/user/passport/logout')

