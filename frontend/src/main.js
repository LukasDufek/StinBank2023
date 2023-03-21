import Vue from 'vue'
import App from './App.vue'
import {router} from './router';
import axios from "axios";

Vue.config.productionTip = false

// Setting up default vue http modules for api calls
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
