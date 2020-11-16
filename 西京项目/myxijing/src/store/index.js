import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // result: [],
    // accountPeriodSetting: []
  },
  mutations: {
    // setLogin(state, result) {
    //   state.result = result
    // },
    // accountPeriodSetting(state, result) {
    //   state.accountPeriodSetting = result
    // }
  },
  actions: {
    // setLogin(context, result) {
    //   context.commit('setLogin', result)
    // },
    // async accountPeriodSetting(context,parmas) {
    //   const result = await axios.post('account_set/Query',parmas)
    //   console.log(result)
    //   context.commit('accountPeriodSetting', result)
    // }
  },
  getters: {},
  modules: {}
})