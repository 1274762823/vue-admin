import {focusRequest} from "@/request";

 const getFocusList = function (){
    return focusRequest('/adv/focus')
}

const getFootAdv = function (){
     return focusRequest('/adv/footadv')
}

const getFloor = ()=> focusRequest('/adv/floor')

export {
    getFocusList,
    getFootAdv,
    getFloor
}
// 提供与广告相关的接口
// import {mockRequest} from "@/request";
// // 获取首页中轮播图的图片列表
// export const  getFocusList = ()=> mockRequest("/adv/focus") ;