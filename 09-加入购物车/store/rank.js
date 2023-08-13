import {getRank} from '@/api/focus'

const state = {
    rankList:[]
};

const mutations = {
    SAVE_RANK_LIST(state,rankList){
        state.rankList = rankList
    }
};

const actions = {
    async getRankData({commit}){
        const {data} = await getRank();
        commit('SAVE_RANK_LIST',data)
        // console.log(data)
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced:true
}