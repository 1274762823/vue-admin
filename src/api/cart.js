import {sphRequest} from "@/request";

//添加购物车
export const getCartList = ()=>sphRequest.get('/cart/cartList')

//添加到购物车(对已有物品进行数量改动)
export const goCartAccount = (skuId,skuNum)=>sphRequest.post(`/cart/addToCart/${ skuId }/${ skuNum }`)


//切换商品选中状态
export const changeCartChecked = (skuID,isChecked)=>sphRequest.get(`/cart/checkCart/${skuID}/${isChecked}`)

//删除单个商品
export const defaultOne = (skuId)=>sphRequest.delete(`/cart/deleteCart/${skuId}`)

//批量删除
export const deleteChecked = (data)=>sphRequest.post(`/cart/batchDeleteCart`,data)

//批量选中
export const checkAll = (isChecked,skuIdList)=>sphRequest.post(`/cart/batchCheckCart/${isChecked}`,skuIdList)