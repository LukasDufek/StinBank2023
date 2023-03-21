import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

//import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        client: JSON.parse(localStorage.client ?? '{}') || {},
        list_of_currencies:[],
        all_client : []
    },



    mutations: {

        async add_new_account(state, account) {

            state.client.accounts.push(account);
            localStorage.setItem('client', JSON.stringify(state.client));

            let id = state.client._id;

            await axios({
                method: 'put',
                url: `http://localhost:5000/api/clients/${id}`,
                data: state.client

            });

        },


        async create_payment(state, pay_content) {

            let all_clients = (await axios.get("/api/clients")).data

           let same_client =false;

            for (let i = 0; i < all_clients.length; i++) {
                for (let j = 0; j < all_clients[i].accounts.length; j++) {
                    if (parseInt(pay_content.to_account) === all_clients[i].accounts[j].account_number) {
                        same_client = true;
                    }
                }
            }

            let client_exist = false;

            for (let i = 0; i < all_clients.length; i++) {
                if (all_clients[i].mail === pay_content.mail_sender) {
                    client_exist = true;
                }
            }


            if(same_client) {


                //1 strhnout penize odesilateli a ulozit do jeho seznamu plateb
                for (let i = 0; i < this.state.client.accounts.length; i++) {
                    if (this.state.client.accounts[i].account_number === parseInt(pay_content.from_account)) {
                        this.state.client.accounts[i].balance -= parseInt(pay_content.money);

                    }else if(this.state.client.accounts[i].account_number === parseInt(pay_content.to_account)){
                        this.state.client.accounts[i].balance += parseInt(pay_content.money);
                    }

                }

                this.state.client.payments.push(pay_content);
                localStorage.setItem('client', JSON.stringify(state.client));

                let id = state.client._id;

                await axios({
                    method: 'put',
                    url: `http://localhost:5000/api/clients/${id}`,
                    data: state.client

                });




            }else if(!same_client && client_exist){



                let id = null;
                for(let i=0; i<all_clients.length; i++){
                    for(let j=0; j<all_clients[i].accounts.length; j++){
                        if(all_clients[i].accounts[j].account_number === parseInt(pay_content.to_account)){
                            all_clients[i].accounts[j].balance += parseInt(pay_content.money);
                            all_clients[i].payments.push(pay_content);
                            id = all_clients[i]._id;
                        }
                    }
                }
                if(id!== null){

                    await axios({
                        method: 'put',
                        url: `http://localhost:5000/api/clients/${id}`,
                        data: state.client

                    });

                }



            }

            //2 zjistit zda se jedna o ucet stejneho klienta nebo ne






        },


        /*
         async is_same_client(state, target_account) {


             let same_client = false;

             let all_clients = (await axios.get("/api/clients")).data

             for (let i = 0; i < all_clients.length; i++) {
                 for (let j = 0; j < all_clients[i].accounts.length; j++) {
                     if (parseInt(target_account) === all_clients[i].accounts[j].account_number) {
                         same_client = true;
                     }
                 }
             }
             return same_client;


         },

        async if_client_exist(state, mail) {

            let all_clients = (await axios.get("/api/clients")).data

            let client_exist = false;
            for (let i = 0; i < all_clients.length; i++) {
                if (all_clients[i].mail === mail) {
                    client_exist = true;
                }
            }
            return client_exist;


        }

         */


    },

});
