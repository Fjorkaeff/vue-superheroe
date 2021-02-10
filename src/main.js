import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import i18n from './i18n'
import FlagIcon from 'vue-flag-icon'
import store from './store/store.js'
import loader from 'vue-ui-preloader';

Vue.use(FlagIcon);
Vue.use(loader);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
