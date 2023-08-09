import Vue from "vue";
import Vuex from "vuex";
import product from "@/store/product";
import films from '@/store/film'
import focus from '@/store/focus'
import rank from '@/store/rank'
import cart from "@/store/cart";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        product,
        films,
        focus,
        rank,
        cart
    }
})

export default  store;

