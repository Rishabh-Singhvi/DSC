import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { store } from './store/store'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  store: store,
  router,
  render: h => h(App)
}).$mount('#app')
