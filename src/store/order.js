import {findUserAddressList, submitOrder, tradeInfo} from "@/api/order";

const state = {
    //地址
    userAddressList:[],
    //购物清单
    orderList: {
        detailArrayList: []
    }
};

const mutations = {

    //购物清单
    SAVE_ORDER_LIST(state,orderList){
        state.orderList = orderList
    },

    //收件人地址
    SAVE_ADDRESS(state,userAddressList){
        state.userAddressList = userAddressList
    },
    //切换收件人
    CHANGE_CONSIGINEE(state,id){
        const a1 = state.userAddressList.find(v=>v.isDefault==='1');
        const a2 = state.userAddressList.find(v=>v.id === id);
        if(a1 === a2){
            return;
        }else{
            a1.isDefault = '0';
            a2.isDefault = '1';
        }

        // state.userAddressList = state.userAddressList.map(v=>{
        //     if(v.id === id){
        //         v.isDefault='1'
        //     }else{
        //         v.isDefault='0'
        //     }
        //     return v
        // })
    }
};

const actions = {
    //提交订单
    async submitOrderAsync(content,{tradeNo,consignee,consigneeTel,deliveryAddress,paymentWay,orderComment,orderDetailList}){
       const res = await submitOrder(tradeNo,{consignee,consigneeTel,deliveryAddress,paymentWay,orderComment,orderDetailList})
        console.log(res)
    },


    //交易页信息
    async tradeInfoAsync({commit}){
       const res = await tradeInfo();
        commit('SAVE_ORDER_LIST',res.data)
    },

//获取用户地址信息 findUserAddressList
    async findUserAddressListAsync({commit}){
        const res = await findUserAddressList();
        commit('SAVE_ADDRESS',res.data)
    }

};
const getters = {
    //总金额
    accountPrice({orderList}){
       return orderList.detailArrayList.reduce((pre,item)=>{
           return pre+item.orderPrice*item.skuNum
       },0)
    },

    //寄送至
    sendWhere({userAddressList}){
        return userAddressList.find(v=>v.isDefault==='1')
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}