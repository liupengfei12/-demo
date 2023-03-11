import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        modelBackgroundColor: '',
        layout: 1
    },
    mutations: {
        SET_COLOR(state, color) {
            state.modelBackgroundColor = color;
        },
        SET_LAYOUT(state, val) {
            state.layout = val;
        }
    },
    actions: {},
    getters: {}
})


export default store