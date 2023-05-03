
const axios = require('axios');
//const file = require("./file.txt");
//import file from './file.txt';


const PaymentsTools = {}

PaymentsTools.load_all_clients = async () => {
    let all_clients = [];
    try {
        all_clients = Array.from((await axios.get("http://localhost:5000/api/clients")).data);
    } catch (err) {
        console.log(err);
    }
    return all_clients;
}

PaymentsTools.is_same_client = (target_account, all_clients) => {

    for (let i = 0; i < all_clients.length; i++) {
        for (let j = 0; j < all_clients[i].accounts.length; j++) {
            if (parseInt(target_account) === all_clients[i].accounts[j].account_number) {
                return true;
            }
        }
    }
    return false;
}


PaymentsTools.create_new_account = (currency) =>{
    let new_account_number;
    let minm = 100000;
    let maxm = 999999;
    new_account_number = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return {"account_number": new_account_number, "currency": currency, "balance":0, "payments":[]}
}


PaymentsTools.add_new_account_part = (actual_client, new_account, all_clients) =>{

    actual_client.accounts.push(new_account);

    for(let i=0; i<all_clients.length; i++){
        if(all_clients[i].mail === actual_client.mail){
            all_clients[i] = actual_client;
        }
    }
    return actual_client;
}




PaymentsTools.add_new_account_all = (actual_client, currency) => {

    let actual_client_change = PaymentsTools.add_new_account_part(actual_client, PaymentsTools.create_new_account(currency), PaymentsTools.load_all_clients());
    PaymentsTools.save_clients(actual_client_change);
    localStorage.setItem('client', JSON.stringify(actual_client_change));

}

PaymentsTools.save_clients = async (actual_client_change) => {

    let id = actual_client_change._id;
    await axios({
        method: 'put',
        url: `http://localhost:5000/api/clients/${id}`,
        data: actual_client_change

    });
}



PaymentsTools.create_payment = async (pay_content, client) => {


    let all_clients = PaymentsTools.load_all_clients();

    let same_client = PaymentsTools.is_same_client(pay_content.to_account, all_clients);


    if (same_client) {


        //1 strhnout penize odesilateli a ulozit do jeho seznamu plateb


        client = PaymentsTools.payment_for_same_client(pay_content, client);





        await PaymentsTools.put_client(client, true);

    } else if (!same_client && PaymentsTools.if_client_exist(pay_content.mail_sender, all_clients)) {



        let client_change = PaymentsTools.payment_for_another_client(pay_content, all_clients);



        if (client_change !== null) {

            await PaymentsTools.put_client(client, false);
        }

    }

}


PaymentsTools.payment_for_same_client = (pay_content, client) => {

    for (let i = 0; i < client.accounts.length; i++) {
        if (client.accounts[i].account_number === parseInt(pay_content.from_account)) {
            client.accounts[i].balance -= parseFloat(pay_content.money);

        }
        if (client.accounts[i].account_number === parseFloat(pay_content.to_account)) {

            client.accounts[i].balance += PaymentsTools.convert_currency_manager(parseFloat(pay_content.money), pay_content.currency, client.accounts[i].currency);
        }

    }
    client.payments.push(pay_content);
    return client;

}

PaymentsTools.payment_for_another_client = (pay_content, all_clients) =>{

    let client_change = null;
    for (let i = 0; i < all_clients.length; i++) {
        for (let j = 0; j < all_clients[i].accounts.length; j++) {
            if (all_clients[i].accounts[j].account_number === parseInt(pay_content.to_account)) {

                all_clients[i].accounts[j].balance += PaymentsTools.convert_currency_manager(parseFloat(pay_content.money), pay_content.currency, all_clients[i].accounts[j].currency);
                all_clients[i].payments.push(pay_content);
                client_change = all_clients[i];
            }
        }
    }
    return client_change;

}




PaymentsTools.put_client = async (client, account_same_client) => {

    if(account_same_client) {
        localStorage.setItem('client', JSON.stringify(client));
    }
    let id = client._id;

    await axios({
        method: 'put',
        url: `http://localhost:5000/api/clients/${id}`,
        data: client,


    });
}



PaymentsTools.if_client_exist = (mail, all_clients) => {

    let client_exist = false;
    for (let i = 0; i < all_clients.length; i++) {
        if (all_clients[i].mail === mail) {
            client_exist = true;
        }
    }
    return client_exist;


}


PaymentsTools.read_cnb_file = () => {
    const file = require('../file.txt');

    let tmp0 = file.default;
    let tmp = tmp0.split('\n');


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





PaymentsTools.convert_CZK_to_some = (sum, to_currency) =>{

    let return_sum = 0;
    let list_of_currencies = PaymentsTools.read_cnb_file();


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

PaymentsTools.convert_some_to_CZK = (sum, from_currency) =>{
    let return_sum = 0;
    let list_of_currencies = PaymentsTools.read_cnb_file();

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

PaymentsTools.convert_currency_manager = (sum, from_currency, to_currency) =>{

    let return_sum;
    if(from_currency === to_currency){
        console.log('stejna mena');
        return_sum = sum;
    }else if(from_currency === 'CZK' && to_currency !== 'CZK'){
        console.log('czk2some');
        return_sum = PaymentsTools.convert_CZK_to_some(sum, to_currency);
        console.log(return_sum);
    }else if(from_currency !== 'CZK' && to_currency === 'CZK'){
        console.log('some2czk');
        return_sum = PaymentsTools.convert_some_to_CZK(sum, from_currency);
    }else{
        console.log('some2some');
        return_sum = PaymentsTools.convert_CZK_to_some(PaymentsTools.convert_some_to_CZK(sum, from_currency), to_currency);
    }
    return return_sum;

}

PaymentsTools.deposit_money_part = (money, account_number, client) => {

    for (let i = 0; i < client.accounts.length; i++) {
        if (client.accounts[i].account_number === account_number) {
            client.accounts[i].balance += parseFloat(money);
        }
    }
    return client;

}

PaymentsTools.generate_number = () => {
    return Math.floor(Math.random() * 900000) + 100000;
}

PaymentsTools.deposit_money = async (money, account_number, client) => {

    PaymentsTools.deposit_money_part(money, account_number, client);
    await PaymentsTools.put_client(client, true);
}



module.exports = PaymentsTools;
//module.exports = file;
