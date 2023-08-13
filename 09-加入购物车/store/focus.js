import {getFocusList,getFootAdv,getFloor} from "@/api/focus";
import {getFilmData} from '@/api/product'

const state = {
    // 首页轮播图信息
    focusList: [],
    footAdvList:[],
    floorsList:[]
};
const mutations = {
    SAVE_FOCUS_LIST(state,focusList){
        state.focusList = focusList;
    },
    SAVE_FA_LIST(state,footAdvList){
        state.footAdvList = footAdvList
    },
    SAVE_Floor_LIST(state,floorsList){
        state.floorsList = floorsList
    }
};
const actions = {
    async getFocusListAsync({commit}){
        const {data} = await getFocusList();
        commit("SAVE_FOCUS_LIST",data);
    },
    async getFootAdvList({commit}){
        const {data} = await getFootAdv();
        commit('SAVE_FA_LIST',data)
    },
    async getFloorList({commit}){
        const {data} = await getFloor();
        commit('SAVE_Floor_LIST',data)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}