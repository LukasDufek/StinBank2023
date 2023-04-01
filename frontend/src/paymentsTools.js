import axios from "axios";
import file from '../../server/file.txt';
import fs from "fs";


export class PaymentsTools {


    client = JSON.parse(localStorage.client ?? '{}') || {};

    constructor() {

    }

    load_all_clients(){
        return JSON.parse(fs.readFileSync('../../server/clients.json', 'utf8'));
    }


    //nevyuyivat local storage, ale klienta poslat take jako parametr
    async add_new_account(account) {

        this.client.accounts.push(account);
        localStorage.setItem('client', JSON.stringify(this.client));

        let id = this.client._id;

        await axios({
            method: 'put',
            url: `http://localhost:5000/api/clients/${id}`,
            data: this.client

        });

    }

    async create_payment(pay_content) {


        let all_clients = (await axios.get("http://localhost:5000/api/clients")).data;

        let same_client = this.is_same_client(pay_content.to_account, all_clients);


        if (same_client) {


            //1 strhnout penize odesilateli a ulozit do jeho seznamu plateb
            for (let i = 0; i < this.client.accounts.length; i++) {
                if (this.client.accounts[i].account_number === parseInt(pay_content.from_account)) {
                    this.client.accounts[i].balance -= parseFloat(pay_content.money);

                } if (this.client.accounts[i].account_number === parseFloat(pay_content.to_account)) {

                    this.client.accounts[i].balance += this.convert_currency_manager(parseFloat(pay_content.money), pay_content.currency, this.client.accounts[i].currency);
                }

            }

            this.client.payments.push(pay_content);
            localStorage.setItem('client', JSON.stringify(this.client));

            let id = this.client._id;

            await axios({
                method: 'put',
                url: `http://localhost:5000/api/clients/${id}`,
                data: this.client,


            });

        } else if (!same_client &&  this.if_client_exist(pay_content.mail_sender, all_clients)) {

            let id = null;
            for (let i = 0; i < all_clients.length; i++) {
                for (let j = 0; j < all_clients[i].accounts.length; j++) {
                    if (all_clients[i].accounts[j].account_number === parseInt(pay_content.to_account)) {

                        all_clients[i].accounts[j].balance += this.convert_currency_manager(parseFloat(pay_content.money), pay_content.currency, all_clients[i].accounts[j].currency);
                        all_clients[i].payments.push(pay_content);
                        id = all_clients[i]._id;
                    }
                }
            }
            if (id !== null) {

                await axios({
                    method: 'put',
                    url: `http://localhost:5000/api/clients/${id}`,
                    data: this.client

                });

            }


        }


    }


     is_same_client(target_account, all_clients) {


        let same_client = false;


        for (let i = 0; i < all_clients.length; i++) {
            for (let j = 0; j < all_clients[i].accounts.length; j++) {
                if (parseInt(target_account) === all_clients[i].accounts[j].account_number) {
                    same_client = true;
                }
            }
        }
        return same_client;


    }

     if_client_exist(mail, all_clients) {

        let client_exist = false;
        for (let i = 0; i < all_clients.length; i++) {
            if (all_clients[i].mail === mail) {
                client_exist = true;
            }
        }
        return client_exist;


    }







    read_cnb_file() {
        //let tmp0 = file.split(/\r?\n/);
        let tmp ='';
        tmp = file.split('\n');

        tmp.shift();
        tmp.shift();
        tmp.pop();

        let list_of_currencies = [];
        let tmp2=[];
        for(let i=0; i<tmp.length; i++){
            let obj = {};
            tmp2=tmp[i].split('|');
            obj = {"amount": tmp2[2], "country_code":tmp2[3], "course":tmp2[4]};
            list_of_currencies.push(obj);

        }


        return list_of_currencies;

    }

    convert_CZK_to_some(sum, to_currency){

        let return_sum = 0;
        let list_of_currencies = this.read_cnb_file();


        for(let i=0; i<list_of_currencies.length; i++){
            if(to_currency ===list_of_currencies[i].country_code){
                if(parseInt(list_of_currencies[i].amount) === 1){
                    return_sum = sum/parseFloat(list_of_currencies[i].course);
                }else if(parseInt(list_of_currencies[i].amount) === 100){
                    return_sum = (sum*100)/parseFloat(list_of_currencies[i].course);
                }
            }
        }
        return return_sum;

    }

    convert_some_to_CZK(sum, from_currency){
        let return_sum = 0;
        let list_of_currencies = this.read_cnb_file();

        for(let i=0; i<list_of_currencies.length; i++) {
            if (from_currency === list_of_currencies[i].country_code) {
                if (parseInt(list_of_currencies[i].amount) === 1) {
                    return_sum = sum*parseFloat(list_of_currencies[i].course);
                }else if(parseInt(list_of_currencies[i].amount) === 100){
                    return_sum = (sum/100)*parseFloat(list_of_currencies[i].course);
                }

            }
        }
        return return_sum;
    }

    convert_currency_manager(sum, from_currency, to_currency){

        let return_sum;
        if(from_currency === to_currency){
            console.log('stejna mena');
            return_sum = sum;
        }else if(from_currency === 'CZK' && to_currency !== 'CZK'){
            console.log('czk2some');
            return_sum = this.convert_CZK_to_some(sum, to_currency);
            console.log(return_sum);
        }else if(from_currency !== 'CZK' && to_currency === 'CZK'){
            console.log('some2czk');
            return_sum = this.convert_some_to_CZK(sum, from_currency);
        }else{
            console.log('some2some');
            return_sum = this.convert_CZK_to_some(this.convert_some_to_CZK(sum, from_currency), to_currency);
        }
        return return_sum;

    }






}

