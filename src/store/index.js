import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    rules: false,
    isDark: !!sessionStorage.getItem('setTheme') || false
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setRules(state, payload) {
      state.rules = payload
    },
    setTheme(state, payload) {
      state.isDark = payload
    } 
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH`)
      return await res.json()
    }
  },
  getters: {
    error: s => s.error,
    rules: s => s.rules,
    isDark: s => s.isDark
  },
  modules: {
    auth, info, category, record
  }
})
