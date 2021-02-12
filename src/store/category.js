import firebase from 'firebase/app'

export default {
  state: {
    categories: []
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload
    }
  },
  getters: {
    getAllCategories: state => state.categories
  },
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        commit('setCategories', Object.keys(categories).map(key => ({ ...categories[key], id: key })))
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return { ...category, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, outcome, id }) {
      try {
        const uid = await dispatch('getUid')
        dispatch('fetchCategories')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit, outcome })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({ commit, dispatch }, { title, limit, outcome }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit, outcome })
        return { title, limit, outcome, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
