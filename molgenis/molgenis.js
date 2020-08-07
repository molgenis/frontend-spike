import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import store from './store/store'
import router from './router/router.js'
import App from './App'

import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faFolderOpen, faHourglass, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faClone, faCut, faDownload, faEdit, faHome, faList, faPaste, faPlus, faSearch, faTimes, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import i18n from '@molgenis/molgenis-i18n-js'
import { SET_SHOW_HIDDEN_RESOURCES } from '@/store/mutations/navigator'

const {lng, fallbackLng, isSuperUser} = window.__INITIAL_STATE__
Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()

// Keeps the router and the store in sync @https://github.com/vuejs/vuex-router-sync
sync(store, router)


// Catch query parameters to render them when accessing a bookmark
router.beforeEach((to, from, next) => {
    // store.commit('setBookmark', to.query.bookmark ? to.query.bookmark : '')
    next()
})

library.add(faCheckCircle, faClone, faCut, faEdit, faDownload, faFolderOpen, faHome, faHourglass, faList, faPaste, faPlus, faSearch, faTimes, faTimesCircle, faTrash, faUpload)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)

Vue.use(i18n, {
    lng,
    fallbackLng: fallbackLng,
    namespace: 'navigator',
    callback() {
    /* eslint-disable no-new */
        global.app = new Vue({
            el: '#app',
            store,
            router,
            components: { App },
            template: '<App />',
        })
        store.commit('navigator/' + SET_SHOW_HIDDEN_RESOURCES, isSuperUser)
    },
})
