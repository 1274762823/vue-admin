import {getFilmData} from '@/api/product'
// import axios from 'axios'
const state = {
    filmList:[]
};

const mutations = {
    Get_Film_Data(state,payload){
       state.filmList = payload
    }
};

const actions = {
    async getFilmList({commit},type){
        const {data} =await getFilmData(type);
        commit('Get_Film_Data',data.films)
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced:true
}

