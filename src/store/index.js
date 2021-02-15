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
    currency: {},
    isDark: !!sessionStorage.getItem('setTheme') || false,
    locale: 'ru-RU'
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
    },
    setCurrency(state, payload) {
      state.currency = payload
    },
    setLanguage(state, payload) {
      state.locale = payload
    }
  },
  actions: {
    async fetchCurrency({commit}) {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH`)
      const body = await res.json()
      commit('setCurrency', body)
      return await body
    }
  },
  getters: {
    error: s => s.error,
    rules: s => s.rules,
    isDark: s => s.isDark,
    currency: s => s.currency,
    locale: s => s.locale,
  },
  modules: {
    auth, info, category, record
  }
})
