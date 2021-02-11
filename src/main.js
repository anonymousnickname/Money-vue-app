import Vue from 'vue'
import 'firebase/auth'
import 'firebase/database'
import App from './App.vue'
import store from './store'
import router from './router'
import VueMeta from 'vue-meta'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app'
import Paginate from 'vuejs-paginate'
import Loader from '@/components/app/Loader'
import dateFilter from '@/filters/date.filter'
import titlePlugin from '@/utils/title.plugin'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'


Vue.use(VueMeta)
Vue.use(Vuelidate)
Vue.use(titlePlugin)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.component('Loader', Loader)
Vue.config.productionTip = false
Vue.component('Paginate', Paginate)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)

firebase.initializeApp({
  apiKey: "AIzaSyBHWW2RAx8qM6j2SKZPyU3yNbxFSLweCTo",
  authDomain: "vue-petproject.firebaseapp.com",
  projectId: "vue-petproject",
  storageBucket: "vue-petproject.appspot.com",
  messagingSenderId: "382139538249",
  appId: "1:382139538249:web:6731f619e2e337fc0a5898"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
