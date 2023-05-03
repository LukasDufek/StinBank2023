import Vue from "vue";
import Vuex from "vuex";

//import axios from "axios";

//import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        client: JSON.parse(localStorage.client ?? '{}') || {},
        list_of_currencies:[],
        all_client : []
    },



    mutations: {




    },

});
