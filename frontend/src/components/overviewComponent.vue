<template>
<div>
 <header-page/>
  <div class="container">


  <div class="overView">
    <h1 style="font-size: 45px">Přehled profilu</h1>
    <section class="profile-info">
      <h3>Jméno: {{client.first_name}}</h3>
      <h3>Příjmení: {{client.last_name}}</h3>
      <h3>Účet: {{actual_account.account_number}}</h3>
      <h3>Měna: {{actual_account.currency}}</h3>
      <h3>Stav účtu: {{Math.round(this.actual_account.balance*100)/100}} {{actual_account.currency}}</h3>
      <h3> Vložit peníze: <input class="input-submit" type="number" step="0.01" min="0" v-model="money1">  <button @click="deposit_money(money1)" class="btn">+</button></h3>



      <button class="btn" @click="to_changing_phase">Změnit účet</button> <button class="btn" @click="to_creating_phase">Vytvořit nový účet</button>
    </section>
  </div>

    <div v-if="account_changing_phase" class="overView">
      <h2>Změna účtu <button class="close-btn" @click="close_window('change_window')" >X</button></h2>
      <section v-for="account in client.accounts" :key="account._id">
        <h3>Číslo účtu: {{account.account_number}}
          Měna: {{account.currency}}
          <button class="btn" @click="change_account(account)">Zvolit</button></h3>
      </section>
    </div>

    <div v-if="account_creating_phase" class="overView">
      <h2>Vytvoření nového účtu <button class="close-btn" @click="close_window('create_window')" >X</button></h2>
      <h2> Vyber měnu:
        <select style="font-size: 23px" v-model="testVal">
          <option v-for="item in this.currencies" :value="item" :key="item">{{item}}</option>
        </select>
      </h2>
      <button class="btn" @click="create_new_account(testVal)">Vytvořit nový účet</button>

    </div>





    <div class="overView">
      <h1>Platba</h1>
      <h2>Stav účtu: {{Math.round(this.actual_account.balance*100)/100}} {{actual_account.currency}}</h2>
      <h3 style="font-size: 28px"> Částka: <input class="input-submit" type="number" step="0.01" min="0" v-model="money"></h3>
      <h3 style="font-size: 28px"> Na účet: <input class="input-submit" type="number" v-model="account_number"></h3>
      <button class="btn" @click="make_payment(account_number, money)">Zaplatit</button>

    </div>



    <div class="main-content">
    <h2>Přehled plateb</h2>

      <section v-for="pay in this.client.payments" :key="pay._id">
        <br>
        <h3>Datum {{pay.date_of_transaction}}</h3>
        <h3>Platba z účtu {{pay.from_account}}</h3>
        <h3>Na účet {{pay.to_account}}</h3>
        <h3>Částka {{pay.money}}</h3>
        <h3>Měna {{pay.currency}}</h3>
        <br>
        <hr>


      </section>
  </div>



</div>

</div>



</template>

<script>

import HeaderPage from "@/components/headerPage";
import {PaymentsTools} from "@/paymentsTools"
import axios from "axios";
//import store from "@/store/store";
const client = JSON.parse(localStorage.client ?? '{}');


const myPaymentsTools = new PaymentsTools();

export default {
  name: "overviewComponent",
  components: {HeaderPage},
  data(){
    return{

      all_clients:[],
      all_payments:[],
      client:client,
      actual_account:{},
      currencies: [],

      account_creating_phase:false,
      account_changing_phase:false,

      money:0,
      money1:0,
      account_number:0,
      text:"",
      testVal:null

      }
     },

  async mounted() {

    this.all_clients=[];
    try {
      this.all_clients = (await axios.get("/api/clients")).data;

    } catch (err) {
      console.log(err);
    }
    this.actual_account = this.client.accounts[0];

    let all_currencies = myPaymentsTools.read_cnb_file();
    for(let i=0; i<all_currencies.length; i++){
      this.currencies.push(all_currencies[i].country_code);
    }
    this.currencies.push('CZK');
    this.currencies.sort();








  },

  methods:{


    to_creating_phase(){
      this.account_creating_phase = true;
    },

    to_changing_phase(){
      this.account_changing_phase = true;
    },

    close_window(window){

      if(window === 'create_window') {
        this.account_creating_phase = false;
      }else if(window === 'change_window'){
        this.account_changing_phase = false;
      }

    },

    create_new_account(currency){

      let new_account_number = this.generate_number_of_account();
      if(!this.control_if_account_exist(new_account_number)){
        let new_account = {"account_number": new_account_number, "currency": currency, "balance":0, "payments":[]}
        //store.commit("add_new_account", new_account);
        myPaymentsTools.add_new_account(new_account);
        location.reload();
      }else{
        this.create_new_account(currency);

      }


    },

    generate_number_of_account() {
      let minm = 100000;
      let maxm = 999999;
      return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    },


    control_if_account_exist(account_number){

      let exist = false;
      for(let i=0; i<this.all_clients.length; i++){
        for(let j=0; j<this.all_clients[i].accounts.length; j++){

          if(account_number === this.all_clients[i].accounts[j].account_number){
            exist = true;
          }
        }
      }
      return exist;

    },

    change_account(account){

      this.actual_account = account;
      this.account_changing_phase = false;

    },


     make_payment(target_account_number, money) {


      if (money > 0 && money <= this.actual_account.balance) {

        let date = new Date().toLocaleDateString('en-GB', {
          day: 'numeric', month: 'numeric', year: 'numeric'
        });
        console.log(typeof date);
        let pay_content = {
          "mail_sender": this.client.mail,
          "from_account": this.actual_account.account_number,
          "to_account": target_account_number,
          "money": money,
          "currency": this.actual_account.currency,
          "date_of_transaction": date
        };

        myPaymentsTools.create_payment(pay_content);

      }

    },

    async deposit_money(money) {


      //console.log(typeof money); //number
      //console.log(typeof this.actual_account.balance); //string

      for(let i=0; i<this.client.accounts.length; i++){
        if(this.client.accounts[i].account_number === this.actual_account.account_number){
          this.client.accounts[i].balance += parseFloat(money);
        }
      }

      localStorage.setItem('client', JSON.stringify(this.client));

      let id = this.client._id;

      await axios({
        method: 'put',
        url: `http://localhost:5000/api/clients/${id}`,
        data: this.client

      });


      location.reload();
    }







  }
}
</script>

<style>


.container{
  height: 200%;
  min-width: 750px;


  margin-top: 5rem;
  padding-top: 1rem;
  padding-bottom: 20rem;
}

.overView{
  margin-left: 2%;
  margin-top: 1%;

  position: center;
  text-align: center;
  width: 96%;
  min-width: 550px;
  background: #d8dcff;
  font-size: 20px;
  border-style: solid;
  border-width: 3px;


}
.profile-info{
  padding-left: 1%;
 text-align: left;
}

.main-content{

  margin-right: auto;
  margin-left: auto;
  margin-top: 2rem;
  position: center;
  text-align: center;
  width: 50%;
  min-width: 500px;
  background: rgba(255, 238, 128, 0.87);
  font-size: 20px;
  border-style: solid;
  border-width: 3px;
  border-radius: 1em;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: -1em;
}

.btn{
  margin-bottom: 1%;
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: 2px solid black;
  font-size: 18px;
}

.close-btn{
  float: right;
  margin-right: 3%;
  background-color: red;
  font-size: 25px;

}


</style>
