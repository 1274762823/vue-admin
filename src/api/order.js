import {sphRequest} from "@/request";

//交易页信息
export const tradeInfo = ()=>sphRequest.get('/order/auth/trade')

//获取用户地址信息  /user/userAddress/auth/findUserAddressList
export const findUserAddressList = ()=>sphRequest.get('/user/userAddress/auth/findUserAddressList')

//提交订单 /order/auth/submitOrder?tradeNo={tradeNo} post
export const submitOrder = (tradeNo,body)=>sphRequest.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,body)