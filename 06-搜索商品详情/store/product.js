import {getSphData,getSearchData,getProductDetail} from "@/api/product";
const product = {
    state:{
        goodsList:[],
        //搜索数据
        searchList:{
            pageNo:1,
            pageSize:5,
            total:118,
            totalPages:12
        },
        productInfo:{
            skuInfo:{
                skuImageList:[]
            }
        }
    },
    mutations:{
        //切换缩略图
        CHANGE_PIC_BY_ID(state,id){
            state.productInfo.skuInfo. skuImageList.find(v=>v.isDefault==='1').isDefault='0';
            state.productInfo.skuInfo. skuImageList.find(v=>v.id===id).isDefault='1';
        },

        Add_Goods(state,payload){
            state.goodsList = payload
        },
        ADD_SEARCH_GOODS(state,searchList){
            state.searchList = searchList
        },
        Add_PRODUCT_INFO(state,productInfo){
            state.productInfo = productInfo
        }
    },
    actions:{
        //获取商品详情
        async getProductInfo({commit},id){
            const {data} = await getProductDetail(id);
            commit('Add_PRODUCT_INFO',data)
            console.log(data.skuInfo.skuImageList
            )
        },

       async getData({commit},num){
            const {data} = await getSphData();
            commit('Add_Goods',data.slice(0,num))
        },
        async getSearchData({commit},body){
           const {data} = await getSearchData(body);
           commit('ADD_SEARCH_GOODS',data)
            console.log(data)
        }
    },
    namespaced:true
}


export default product