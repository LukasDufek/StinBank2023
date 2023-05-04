<template>
  <div class="container-login">
    <div class="card card-container">
      <h1 class="welcome">Vítejte v aplikaci</h1> <h3 class="logo" style="color: red!important;">StinBank</h3>
      <h1 class="login-input">Přihlášení</h1>
      <img class="profile-img-card" alt="" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />

      <form class="form-signin">
        <span class="reauth-email"></span>
        <input type="text" id="email-adress" placeholder="Email" v-model="email" />
        <input type="password" id="inputPassword" placeholder="Heslo" v-model="password" />
        <button class="login-button" value="login" @click="loginSystem" type="submit">Přihlásit</button>


        <br>

      </form>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "loginComponent",

  data() {
    return {
      email: '',
      password: '',
      msg: '',
      client: {},
      clients: []


    };
  },

  async mounted() {

    this.clients=[];
    try {
      this.clients = (await axios.get("/api/clients")).data;
    } catch (err) {
      console.log(err);
    }
    console.log(this.clients);
  },

  methods:{

    login_compare(){
      for(let i=0; i<this.clients.length; i++){
        if(this.clients[i].mail === this.email && this.clients[i].password === this.password){
          localStorage.setItem('client', JSON.stringify(this.clients[i]));
          return true;

        }

      }
      return false;

    },

    async loginSystem() {

      if (this.login_compare()) {
        //push do druheho overovaciho okna
        this.$router.push('./between');

        await this.sendEmail();

        //location.reload();

      } else {
        console.log('Nesprávné jméno nebo heslo');
      }

    },



    async sendEmail() {

      const formData = {
        to: this.email
      };

     const response = await fetch("api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)

      })
      console.log(JSON.stringify(formData));
      if (response.ok) {
        alert('Email byl úspěšně odeslán.')
      } else {
        alert('Odeslání emailu se nezdařilo.')
      }
    }


  }


};

</script>

<style>


.card-container.card {
  max-width: 350px;
  min-width: 350px;
  min-height: 650px;
  padding: 40px 40px;
  border: #7cff97 4px solid;
  /* border: #7cff97; */


}

.welcome{
  text-align: center;
  font-size: 35px;
}


.login-input{
  font-size: 35px;
  font-family: "Arial Black",serif;
  text-align: center;
  padding-bottom: 20px;
}
/*
 * Card component
 */
.card {
  background-color: #F7F7F7;
  padding: 20px 25px 30px;
  margin: 50px auto 25px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}







.profile-img-card {

  width: 96px;
  height: 96px;
  margin-left: 35%;
  margin-bottom: 5%;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.reauth-email {
  display: block;
  color: #404040;
  line-height: 2;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin, #email-adress,
.form-signin #inputPassword {
  direction: ltr;
  height: 44px;
  font-size: 16px;
}

.form-signin,
.form-signin input[type=password],
.form-signin input[type=text],
.form-signin button {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  z-index: 1;
  position: relative;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin:focus {
  border-color: rgb(104, 145, 162);
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.login-button{

  margin-bottom: 5%;

  box-shadow:inset 0 1px 0 0 #bee2f9;
  background-color:#63b8ee;
  border-radius:6px;
  border:1px solid #3866a3;
  display:inline-block;
  cursor:pointer;
  color:#14396a;
  font-family:Arial,serif;
  font-size:18px;
  font-weight:bold;
  padding:6px 24px;
  text-decoration:none;
  text-shadow:0 1px 0 #7cacde;
}


.logo{

  margin-left: 1rem;
  text-align: center;
  font-size: 4rem;
  /* color: #A7DD3C; */

  color: #b144ff;
}


</style>
