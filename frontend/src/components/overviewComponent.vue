<template>
<div class="main-contentA">
 <header-page/>
  <div class="container">


  <div class="overView">
    <h2>Zde bude přehled profilu</h2>
  </div>


  <div class="main-content">
    <h2>Zde bude přehled plateb</h2>
  </div>



</div>

</div>



</template>

<script>
import HeaderPage from "@/components/headerPage";
export default {
  name: "overviewComponent",
  components: {
    HeaderPage
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

  position: center;
  text-align: center;
  width: 96%;
  min-width: 550px;
  background: #b9c1ff;
  font-size: 20px;
  border-style: solid;
  border-width: 3px;


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


</style>
