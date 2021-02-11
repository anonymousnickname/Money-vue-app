import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        commit('setRecords', Object.keys(records).map(key => ({...records[key], id: key})))
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return {...record, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  state: {
    records: []
  },
  mutations: {
    setRecords(state, payload) {
      state.records = payload
    },
    reverseRecords(state) {
      const newArr = state.records.reverse();
      state.records = newArr
      console.log(state.records)
    }
  },
  getters: {
    getAllRecords: state => state.records
  }
}
