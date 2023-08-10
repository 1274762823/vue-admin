import {getCartList,goCartAccount,changeCartChecked,defaultOne,deleteChecked,checkAll} from "@/api/cart";

const state = {
    //添加购物车
    cartList:[],


};
const mutations = {


    //添加购物车
    ADD_CART_LIST(state,cartList){
        state.cartList = cartList
    },
};
const actions = {
    //批量选中
    async checkAllAsync({dispatch,state,commit},isChecked){
         await checkAll(isChecked,state.cartList.map(v=>v.skuId));
        await dispatch('addCart')
    },

    //批量删除
    async deleteCheckedAsync({dispatch,state}){
        await deleteChecked(state.cartList.filter(v=>v.isChecked === 1).map(v=>v.skuId));
        // await dispatch('addCart');
    },

    //删除单个
    async defaultOneAsync({dispatch},skuId){
         await defaultOne(skuId)
        // console.log(data)
        dispatch('addCart')
    },

    //切换选中状态重新
    async changeCartCheckedAsync({dispatch},{skuID,isChecked}){
        const res = await changeCartChecked(skuID,isChecked);
        if(res.code===200){
            dispatch('addCart')
        }
    },


    //对已有物品进行数量改动
    async goCartAccountAsync({dispatch},{skuId,skuNum}){
         await goCartAccount(skuId,skuNum);
        // console.log('111',data)
        await dispatch('addCart')
    },

    //添加购物车
    async addCart({commit}){
        const {data} = await getCartList();
        commit('ADD_CART_LIST',data[0] ? data[0].cartInfoList : [])
        console.log('222',data)
    }
};

const getters = {
    countPrice({cartList}){
        let price = 0;
        cartList.forEach(item=>{
            if(item.isChecked === 1){
                price += item.skuNum*item.skuPrice
            }

        })
        return {price}
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}