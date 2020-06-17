import Vue from 'vue'
import Vuex from 'vuex'

import navigatorState from './state/navigator'
import navigatorMutations from './mutations/navigator'
import navigatorGetters from './getters/navigator'
import navigatorActions from './actions/navigator'

import explorerState from './state/explorer'
import explorerMutations from './mutations/explorer'
import explorerGetters from './getters/explorer'
import explorerActions from './actions/explorer'

import headerState from './state/header'
import headerMutations from './mutations/header'
import headerActions from './actions/header'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    explorer: {
      namespaced: true,
      state: explorerState,
      mutations: explorerMutations,
      actions: explorerActions,
      getters: explorerGetters,
    },
    header: {
      namespaced: true,
      state: headerState,
      mutations: headerMutations,
      actions: headerActions,
    },
    navigator: {
      namespaced: true,
      state: navigatorState,
      mutations: navigatorMutations,
      actions: navigatorActions,
      getters: navigatorGetters,
    }
  },
  state: {
    settings: {
      legacy: {
        explorer: false,
        navigator: false,
        entityEditor: false
      }
    },
  },

  strict: process.env.NODE_ENV !== 'production'
})
