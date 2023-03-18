import Vue from 'vue';
import VueRouter from 'vue-router';


import loginComponent from "@/components/loginComponent";
import overviewComponent from "@/components/overviewComponent";

Vue.use(VueRouter);

export const routes = [

     {
        path:"/", component: loginComponent,

    },

    {
        path:"/profile", component: overviewComponent,
    },

]

export const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes

});
