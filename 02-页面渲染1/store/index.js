import Vue from "vue";
import Vuex from "vuex";
import product from "@/store/product";
import films from '@/store/film'
import focus from '@/store/focus'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        product,
        films,
        focus
    }
})

export default  store;

