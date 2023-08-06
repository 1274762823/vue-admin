import getSphRes from "@/products";

export default {
    state:{
        goodsList:[]
    },
    mutations:{
      Add_Data(state,payload){
          state.goodsList = payload;
      }
    },
    actions:{
       // async getGoodsData({state},num){
          // await  getSphRes()
          //       .then(value=>{
          //           state.goodsList = value.data.slice(0,num)
          //           console.log(value.data)
          //       },err=>alert(err))
        async getGoodsData({commit},num){
           const {data} = await getSphRes();
           commit('Add_Data',data.splice(0,num))
        }
    },
    namespace:true
}