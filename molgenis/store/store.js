import explorerActions from './actions/explorer.js'
import explorerGetters from './getters/explorer.js'
import explorerMutations from './mutations/explorer.js'
import explorerState from './state/explorer.js'

import headerActions from './actions/header.js'
import headerMutations from './mutations/header.js'
import headerState from './state/header.js'

import metadataActions from './actions/metadata.js'
import metadataGetters from './getters/metadata.js'
import metadataMutations from './mutations/metadata.js'
import metadataState from './state/metadata.js'

import navigatorActions from './actions/navigator.js'
import navigatorGetters from './getters/navigator.js'
import navigatorMutations from './mutations/navigator.js'
import navigatorState from './state/navigator.js'

import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        explorer: {
            actions: explorerActions,
            getters: explorerGetters,
            mutations: explorerMutations,
            namespaced: true,
            state: explorerState,
        },
        header: {
            actions: headerActions,
            mutations: headerMutations,
            namespaced: true,
            state: headerState,
        },
        metadata: {
            actions: metadataActions,
            getters: metadataGetters,
            mutations: metadataMutations,
            namespaced: true,
            state: metadataState,
        },
        navigator: {
            actions: navigatorActions,
            getters: navigatorGetters,
            mutations: navigatorMutations,
            namespaced: true,
            state: navigatorState,
        },
    },
    state: {
        settings: {
            legacy: {
                entityEditor: false,
                explorer: true,
                navigator: false,
            },
        },
    },

    strict: false,
})
