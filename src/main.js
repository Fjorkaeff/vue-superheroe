import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import i18n from './i18n'
import FlagIcon from 'vue-flag-icon'
import store from './store/store.js'
/*import Axios from 'axios';
const CryptoJS = require("crypto-js");

const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";
const PUB_KEY = "e23507931830c9ee423da4a822ea0574";

const ts = Date.now();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();
const url = "http://gateway.marvel.com/v1/public/characters";*/

Vue.use(FlagIcon);
Vue.config.productionTip = false

new Vue({
  beforeCreate: function() {
    //this.$store.dispatch('getHeroesListFromMarvel')
  },
  vuetify,
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
