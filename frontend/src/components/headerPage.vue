<template>

  <header class="header">

    <div class="logo">StinBank</div>

    <div class="navbar">

        <h3>Vítejte v aplikaci StinBank</h3>


      <button class="logout-button" @click="logout">Odhlásit se</button>




    </div >


  </header>


</template>

<script>
export default {
  name: "headerPage",

  methods:{

    /*
    logout(){
      localStorage.removeItem('client');
      this.$router.push('./');

    }

     */

  }
}
</script>

<style scoped>


.header {

  background-color: white;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;

  height: 5rem;
  display: flex;
  flex: auto;
  width: 100%;
  min-width: 550px;
  padding-bottom: 1.5%;

  border-bottom: 4px solid black;
}


.navbar{
  position: relative;
  margin-left: 1em;
  text-decoration: none;

  font-size: 20px;
  text-align: center;


}
.navbar h3{
  text-align: center;
}


.logo{

  float: right;

  margin-left: 1rem;
  margin-right: 1rem;

  font-size: 35px;
  /* color: #A7DD3C; */

  color: black;

}




.logout-button{
  position: fixed;
  right: 5%;
  top: 2%;

  margin-left: 1rem;

  font-size: 20px;
  text-align: center;

  background-color: #008CBA;
  outline: none;
  color: white;
  padding: 0.3vw 1.4vw;

}

.logout-button:hover{
  text-decoration: underline;
}


</style>
