import {getSphData,getSearchData} from "@/api/product";
const product = {
    state:{
        goodsList:[],
        //搜索数据
        searchList:{
            pageNo:1,
            pageSize:5,
            total:118,
            totalPages:12
        }
    },
    mutations:{
        Add_Goods(state,payload){
            state.goodsList = payload
        },
        ADD_SEARCH_GOODS(state,searchList){
            state.searchList = searchList
        }
    },
    actions:{
       async getData({commit},num){
            const {data} = await getSphData();
            commit('Add_Goods',data.slice(0,num))
           // console.log(data)
        },
        async getSearchData({commit},body){
           const {data} = await getSearchData(body);

           commit('ADD_SEARCH_GOODS',data)
            // console.log(data)
        }
    },
    namespaced:true
}


export default product