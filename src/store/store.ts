import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        logged: false,
        userData: {}
    },
    mutations: {
        loggin (state, user) {
            state.logged = true;
            state.userData = user;
        },
        logout (state) {
            state.logged = false;
            state.userData = {};
        },
        updateUser (state, user) {
            state.userData = user;
        }
    }
});