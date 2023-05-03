import { createRouter, createWebHistory } from 'vue-router'
//import Vue from 'vue';
//import VueRouter from 'vue-router';


import loginComponent from "@/components/loginComponent";
import overviewComponent from "@/components/overviewComponent";
import betweenComponent from "@/components/betweenComponent";

//Vue.use(VueRouter);

export const routes = [

  {
    path:"/", component: loginComponent,

  },

  {
    path: "/between", component: betweenComponent,
  },

  {
    path:"/profile", component: overviewComponent,
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
