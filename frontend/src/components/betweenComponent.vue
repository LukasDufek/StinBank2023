<template>

  <div class="container-login">
    <div class="card card-container">
      <h1 class="welcome">Vítejte v aplikaci</h1> <h3 class="logo">StinBank</h3>
      <h1 class="login-input">Přihlášení</h1>
      <img class="profile-img-card" alt="" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />

      <form class="form-signin">
        <span class="reauth-email"></span>
        <h2 class="write-code">Zadej ověřovací kod</h2>
        <input id="inputPassword" placeholder="Heslo" type="password" v-model="code" />
        <button class="login-button" value="login" @click="to_profile" type="submit">Přihlásit</button>


        <br>

      </form>
    </div>
  </div>


</template>

<script>
//import router from "@/router";

//import axios from "axios";

const axios = require('axios');

export default {
  name: "betweenComponent",
  props: ['code', 'code_from_mail'],
   data(){
    return{

      client: JSON.parse(localStorage.client),
      clients:[],
      code:0
    }
   },

  async mounted() {

    this.clients = [];
    try {
      this.clients = (await axios.get("/api/clients")).data;
    } catch (err) {
      console.log(err);
    }
    this.find_client();

  },

  methods:{

    find_client(){
      for(let i=0; i<this.clients.length; i++){
        if(this.clients[i].mail === this.client.mail){
          this.client = this.clients[i];
          //console.log(this.clients[i]);

        }
      }
      console.log(this.client);

    },

    to_profile(){
      if(parseInt(this.code) === this.client.code){
        this.$router.push( './profile');
      }else{
        alert('Spatny kod');
      }
    }

  }

}
</script>

<style scoped>

</style>
