import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        text: 'Test',
        user: {
            name: 'Iresh'
        },
        logged: false
    },
    mutations: {
        setUser: (state, logged) => {
            state.logged = logged[0]
            console.log(logged[1])
            if(logged[0]) {
                state.user = logged[1]
            }
        }
    }
})