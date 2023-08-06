import {getSphData} from "@/api/product";
const product = {
    state:{
        goodsList:[]
    },
    mutations:{
        Add_Goods(state,payload){
            state.goodsList = payload
        }
    },
    actions:{
       async getData({commit},num){
            const {data} = await getSphData();
            commit('Add_Goods',data.slice(0,num))
           // console.log(data)
        }
    },
    namespaced:true
}


export default product